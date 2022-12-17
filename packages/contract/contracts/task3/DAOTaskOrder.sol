// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DAOTaskOrderNFT.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./POAP.sol";

contract DAOTaskOrder is DAOTaskOrderNFT {
    POAP internal poapForPublisher;
    POAP internal poapForEmployer;
    POAP internal poapForIntercessor;

    enum OrderStatus {
        Open, /** 订单已创建，但未结算 */
        Cancelled, /** 订单已退单 */
        WaitIntercess, /** 等待仲裁 */
        Finished /** 订单已结算 */
    }

    struct OrderGroup {
        // 发起者
        address publisher;
        // 工作者
        address employer;
        // 仲裁者
        address intercessor;
        // metadataURI
        string metadataURI;
        // 任务描述
        string title;
        // token
        address token;
        uint256 createAt;
        uint256[] orders;
    }
    // 里程碑
    struct Order {
        // 解锁价格
        uint256 amount;
        // 时间节点
        uint256 deadlineTimestamp;
        // 关联的 OrderGroup
        uint256 groupId;
        // 订单状态
        OrderStatus status;
    }

    mapping(uint256 => OrderGroup) public orderGroups;
    mapping(uint256 => Order) public orders;

    uint256 public orderGroupCount;
    uint256 public orderCount;

    mapping(address => uint256[]) internal publishersOrderGroups;
    mapping(address => uint256[]) internal employersOrderGroups;
    mapping(address => uint256[]) internal intercessorsOrderGroups;

    function _createOrderGroup(OrderGroup memory orderGroup)
        internal
        returns (uint256)
    {
        orderGroupCount++;
        orderGroup.createAt = block.timestamp;
        orderGroups[orderGroupCount] = orderGroup;
        return orderGroupCount;
    }

    function _createOrders(
        uint256[] memory amounts,
        uint256[] memory deadlineTimestamps,
        uint256 groupId
    ) internal returns (uint256) {
        uint256 tokenAmount;
        OrderGroup memory orderGroup = orderGroups[groupId];
        IERC20 token = IERC20(orderGroup.token);

        for (uint256 i = 0; i < amounts.length; i++) {
            tokenAmount += amounts[i];
            // 生成 order
            orderCount++;
            orders[orderCount] = Order(
                amounts[i],
                deadlineTimestamps[i],
                groupId,
                OrderStatus.Open
            );
            orderGroups[groupId].orders.push(orderCount);

            // 生成 orderNFT ，将其转让给 publisher 持有
            _safeMint(msg.sender, orderCount);
        }
        // 扣除用户的 token
        // require也可删掉,因为会transferFrom会自动触发

        token.transferFrom(msg.sender, address(this), tokenAmount);

        publishersOrderGroups[msg.sender].push(groupId);
        employersOrderGroups[orderGroup.employer].push(groupId);
        intercessorsOrderGroups[orderGroup.intercessor].push(groupId);

        return orderCount;
    }

    function _finishOrder(uint256 orderId, bool byEmployer) internal {
        Order memory order = orders[orderId];
        OrderGroup memory orderGroup = orderGroups[order.groupId];
        IERC20 token = IERC20(orderGroup.token);
        if (byEmployer) {
            // 转移 token 给 employer
            token.transfer(orderGroup.employer, order.amount);
            poapForEmployer.mint(msg.sender,orderId);
poapForPublisher.mint(msg.sender,orderId);
        } else {
            // 转移 token 给发起者
            token.transfer(orderGroup.publisher, order.amount);
        }

        // 将 order 的状态置为已结算
        orders[orderId].status = OrderStatus.Finished;

        // 删除阶段NFT
        _burn(orderId);
    }

    // 被雇佣者使用 orderNFT 可以结算 order，获取 token
    function finishOrderByEmployer(uint256 orderId) public {
        require(ownerOf(orderId) == msg.sender, "not owner");
        Order memory order = orders[orderId];
        OrderGroup memory orderGroup = orderGroups[order.groupId];
        // 这步必然open,所以可以优化掉
        require(order.status == OrderStatus.Open, "order not open");
        require(orderGroup.employer == msg.sender, "not employee");

        _finishOrder(orderId, true);
    }

    // 发起者可以在 order 状态为 cancel 的情况下，用 orderNFT 兑换 token
    function finishOrderByPublisher(uint256 orderId) public {
        require(ownerOf(orderId) == msg.sender, "not owner");
        Order memory order = orders[orderId];
        OrderGroup memory orderGroup = orderGroups[order.groupId];
        require(order.status == OrderStatus.Cancelled, "order not cancelled");
        require(orderGroup.publisher == msg.sender, "not publisher");

        _finishOrder(orderId, false);
    }

    // 在 order 状态为 open 的情况下，并且 deadlineTimestamp 已经过去的情况下
    // 发起者和雇佣者都可以将订单标记为等待仲裁的状态，此时订单需要仲裁介入，任何人不能兑换报酬
    function markStatusToIntercess(uint256 orderId) public {
        Order memory order = orders[orderId];
        OrderGroup memory orderGroup = orderGroups[order.groupId];
        require(order.status == OrderStatus.Open, "order not open");
        require(
            orderGroup.publisher == msg.sender ||
                orderGroup.employer == msg.sender,
            "not publisher or employee"
        );
        require(block.timestamp > order.deadlineTimestamp, "not deadline");

        orders[orderId].status = OrderStatus.WaitIntercess;
        poapForIntercessor.mint(msg.sender,orderId);
    }

    // 仲裁者可以在 order 状态为 WaitIntercess 的情况下操作
    // 将 order 状态置为 cancel 或者 将 nft 强制转移给 employer

    function intercessorOrder(uint256 orderId, bool isCancel) public {
        Order memory order = orders[orderId];
        OrderGroup memory orderGroup = orderGroups[order.groupId];
        require(
            order.status == OrderStatus.WaitIntercess,
            "order not in WaitIntercess"
        );
        require(orderGroup.intercessor == msg.sender, "not intercessor");

        if (isCancel) {
            orders[orderId].status = OrderStatus.Cancelled;
        } else {
            _transfer(orderGroup.publisher, orderGroup.employer, orderId);
            orders[orderId].status = OrderStatus.Open;
        }
    }

    function getOrderGroup(uint256 groupId)
        public
        view
        returns (OrderGroup memory)
    {
        return orderGroups[groupId];
    }

    function getOrder(uint256 orderId) public view returns (Order memory) {
        return orders[orderId];
    }

    function getPublishersOrderGroups(address publisher)
        public
        view
        returns (uint256[] memory)
    {
        return publishersOrderGroups[publisher];
    }

    function getEmployersOrderGroups(address employer)
        public
        view
        returns (uint256[] memory)
    {
        return employersOrderGroups[employer];
    }

    function getIntercessorsOrderGroups(address intercessor)
        public
        view
        returns (uint256[] memory)
    {
        return intercessorsOrderGroups[intercessor];
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "./DAOTaskOrder.sol";
import "hardhat/console.sol";

contract DAOTask is DAOTaskOrder {
    using ECDSA for bytes32;

    constructor(
        POAP _poapForPublisher,
        POAP _poapForEmployer,
        POAP _poapForIntercessor
    ) {
        poapForPublisher = _poapForPublisher;
        poapForEmployer = _poapForEmployer;
        poapForIntercessor = _poapForIntercessor;
    }

    function createOrderGroupTest(
        address publisher,
        address employer,
        address intercessor,
        string memory title,
        string memory metadataURI,
        address token
    ) public {}

    // 创建任务单和子任务单，首先验证三方的签名, 然后创建主任务单和里程碑任务单
    function createOrderGroup(
        address publisher,
        address employer,
        address intercessor,
        string memory title,
        string memory metadataURI,
        address token,
        uint256[] memory amounts,
        uint256[] memory deadlineTimestamps,
        bytes[] memory signatures
    ) public {
        // bytes calldata publisherSignature,
        // bytes calldata employerSignature,
        // bytes calldata intercessorSignature
        // bytes32 nonce = keccak256(
        //     abi.encodePacked(
        //         orderGroup.publisher,
        //         orderGroup.employer,
        //         orderGroup.intercessor,
        //         orderGroup.metadataURI,
        //         orderGroup.title,
        //         orderGroup.token
        //     )
        // );
        // 验证输入数据长度合法性
        require(
            amounts.length == deadlineTimestamps.length,
            "incorrect attributes length"
        );
        // 验证deadline合法性
        uint256 startTime = block.timestamp;
        for (uint256 i; i < amounts.length; i++) {
            console.log("deadlineTimestamps[i]:", deadlineTimestamps[i]);
            console.log("startTime:", startTime);
            require(
                deadlineTimestamps[i] > startTime,
                "incorrect attributes:deadlineTimestamps"
            );
            // startTime = deadlineTimestamps[i];
        }
        // // 验证三方的签名
        // require(
        //     _verify(nonce, orderGroup.publisher, publisherSignature),
        //     "publisher signature error"
        // );
        // require(
        //     _verify(nonce, orderGroup.employer, employerSignature),
        //     "employer signature error"
        // );
        // require(
        //     _verify(nonce, orderGroup.intercessor, intercessorSignature),
        //     "intercessor signature error"
        // );

        OrderGroup memory group;
        group.publisher = publisher;
        group.employer = employer;
        group.intercessor = intercessor;
        group.title = title;
        group.metadataURI = metadataURI;
        group.token = token;

        // 创建任务单
        uint256 groupId = _createOrderGroup(group);
        // 创建子任务单

        _createOrders(amounts, deadlineTimestamps, groupId);
    }

    function _verify(
        bytes32 nonce,
        address _signer,
        bytes memory signature
    ) private pure returns (bool) {
        return (_recover(nonce, signature) == _signer);
    }

    function _recover(bytes32 hash, bytes memory _token)
        private
        pure
        returns (address)
    {
        return hash.toEthSignedMessageHash().recover(_token);
    }
}

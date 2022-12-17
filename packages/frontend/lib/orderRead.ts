import {
  DAOTaskOrder,
  OrderGroupStruct,
} from './../typechain-types/contracts/task3/DAOTaskOrder';
import { readContract } from '@wagmi/core';
import { config } from '../config';
import { abi } from '../task3/DAOTaskMain.sol/DAOTask';
export const orderReader = {
  publisherOrderGroups: async (publisher: string) => {
    const data = await readContract({
      address: config.contract,
      abi: abi,
      functionName: 'getPublishersOrderGroups',
      args: [publisher],
    });
    console.log('publisherOrderGroups', data);
    return data as string[];
  },
  orderGroup: async (orderGroupId: string) => {
    const data = await readContract({
      address: config.contract,
      abi: abi,
      functionName: 'getOrderGroup',
      args: [orderGroupId],
    });
    console.log('orderGroup', data);
    return data as Promise<DAOTaskOrder.OrderGroupStruct>;
  },
};

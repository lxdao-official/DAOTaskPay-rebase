import {
  DAOTaskOrder,
  OrderGroupStruct,
} from './../typechain-types/contracts/task3/DAOTaskOrder';
import { readContract, prepareWriteContract, writeContract } from '@wagmi/core';
import { config } from '../config';
import { abi } from '../task3/DAOTaskMain.sol/DAOTask';
import { BigNumber } from 'ethers';
export const orderReader = {
  getPublishersOrderGroups: async (publisher: string) => {
    console.log('publisher', publisher);
    const data: any = await readContract({
      address: config.contract,
      abi: abi,
      functionName: 'getPublishersOrderGroups',
      args: [publisher],
    });
    const result = data[0].map((element: any, i: number) => {
      return { ...element, id: data[1][i] };
    });
    return result as OrderGroupStruct[];
  },
  getEmployersOrderGroups: async (employer: string) => {
    console.log('employer', employer);
    const data: any = await readContract({
      address: config.contract,
      abi: abi,
      functionName: 'getEmployersOrderGroups',
      args: [employer],
    });
    console.log('getEmployersOrderGroups', data);
    const result = data[0].map((element: any, i: number) => {
      return { ...element, id: data[1][i] };
    });
    return result as OrderGroupStruct[];
  },
  getIntercessorsOrderGroups: async (intercessor: string) => {
    console.log('intercessor', intercessor);
    const data: any = await readContract({
      address: config.contract,
      abi: abi,
      functionName: 'getIntercessorsOrderGroups',
      args: [intercessor],
    });
    console.log('getIntercessorsOrderGroups', data);
    const result = data[0].map((element: any, i: number) => {
      return { ...element, id: data[1][i] };
    });
    return result as OrderGroupStruct[];
  },
  orderGroup: async (orderGroupId: string) => {
    console.log('orderGroupId', orderGroupId);
    const data: any = await readContract({
      address: config.contract,
      abi: abi,
      functionName: 'getOrderGroup',
      args: [BigNumber.from(orderGroupId)],
    });
    console.log('orderGroup', data);
    return {
      orderGroup: data[0] as DAOTaskOrder.OrderGroupStruct,
      orders: data[1] as DAOTaskOrder.OrderStruct[],
    };
  },
  createOrderGroup: async (
    publisher: string,
    employer: string,
    intercessor: string,
    title: string,
    metadataURI: string,
    token: string,
    amounts: BigNumber[],
    deadlineTimestamps: BigNumber[],
    signatures: string[],
  ) => {
    const con = await prepareWriteContract({
      address: config.contract,
      abi: abi,
      functionName: 'createOrderGroup',
      args: [
        publisher,
        employer,
        intercessor,
        title,
        metadataURI,
        token,
        amounts,
        deadlineTimestamps,
        signatures,
      ],
    });
    const data = await writeContract(con);
  },
};

import {
  DAOTaskOrder,
  OrderGroupStruct,
} from './../typechain-types/contracts/task3/DAOTaskOrder';
import { readContract, prepareWriteContract, writeContract } from '@wagmi/core';
import { config } from '../config';
import { abi } from '../task3/ERC20/MockERC20';
import { BigNumber } from 'ethers';
import { ethers } from 'ethers';
export const tokenOpt = {
  approve: async (amount: number) => {
    const con = await prepareWriteContract({
      address: config.token.LXP,
      abi: abi,
      functionName: 'approve',
      args: [
        config.contract,
        ethers.utils.parseEther(amount.toString()).toString(),
      ],
    });
    const data = await writeContract(con);
  },
};

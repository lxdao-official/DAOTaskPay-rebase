/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  Ownable,
  OwnableInterface,
} from "../../../../contracts/ownership/ownable.sol/Ownable";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "CANNOT_TRANSFER_TO_ZERO_ADDRESS",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "NOT_CURRENT_OWNER",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50600080546001600160a01b031916331790556103c0806100326000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c8063860d248a146100515780638da5cb5b146100a3578063f2fde38b146100e8578063f3fe3bc3146100fd575b600080fd5b61008d6040518060400160405280600681526020017f303138303032000000000000000000000000000000000000000000000000000081525081565b60405161009a91906102da565b60405180910390f35b6000546100c39073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161009a565b6100fb6100f636600461034d565b610139565b005b61008d6040518060400160405280600681526020017f303138303031000000000000000000000000000000000000000000000000000081525081565b60005460408051808201909152600681527f303138303031000000000000000000000000000000000000000000000000000060208201529073ffffffffffffffffffffffffffffffffffffffff1633146101c9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101c091906102da565b60405180910390fd5b5060408051808201909152600681527f3031383030320000000000000000000000000000000000000000000000000000602082015273ffffffffffffffffffffffffffffffffffffffff821661024c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101c091906102da565b506000805460405173ffffffffffffffffffffffffffffffffffffffff808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b600060208083528351808285015260005b81811015610307578581018301518582016040015282016102eb565b81811115610319576000604083870101525b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016929092016040019392505050565b60006020828403121561035f57600080fd5b813573ffffffffffffffffffffffffffffffffffffffff8116811461038357600080fd5b939250505056fea26469706673582212202dde3344c5b9a9f08439c0fc6554027d49f04497c3a1b1322c9710cf511c7d2764736f6c63430008090033";

type OwnableConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: OwnableConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Ownable__factory extends ContractFactory {
  constructor(...args: OwnableConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Ownable> {
    return super.deploy(overrides || {}) as Promise<Ownable>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Ownable {
    return super.attach(address) as Ownable;
  }
  override connect(signer: Signer): Ownable__factory {
    return super.connect(signer) as Ownable__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OwnableInterface {
    return new utils.Interface(_abi) as OwnableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Ownable {
    return new Contract(address, _abi, signerOrProvider) as Ownable;
  }
}

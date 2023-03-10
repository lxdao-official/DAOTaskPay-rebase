/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "ERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721__factory>;
    getContractFactory(
      name: "IERC721Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Metadata__factory>;
    getContractFactory(
      name: "IERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721__factory>;
    getContractFactory(
      name: "IERC721Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Receiver__factory>;
    getContractFactory(
      name: "ERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "DID",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DID__factory>;
    getContractFactory(
      name: "DID",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DID__factory>;
    getContractFactory(
      name: "Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Metadata__factory>;
    getContractFactory(
      name: "PayDID",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PayDID__factory>;
    getContractFactory(
      name: "Price",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Price__factory>;
    getContractFactory(
      name: "Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Metadata__factory>;
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "PavoID",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PavoID__factory>;
    getContractFactory(
      name: "Price",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Price__factory>;
    getContractFactory(
      name: "SBT",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SBT__factory>;
    getContractFactory(
      name: "DAOTask",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DAOTask__factory>;
    getContractFactory(
      name: "DAOTaskOrder",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DAOTaskOrder__factory>;
    getContractFactory(
      name: "DAOTaskOrderNFT",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DAOTaskOrderNFT__factory>;
    getContractFactory(
      name: "POAP",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.POAP__factory>;
    getContractFactory(
      name: "ERC721A__IERC721Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721A__IERC721Receiver__factory>;
    getContractFactory(
      name: "ERC721A",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721A__factory>;
    getContractFactory(
      name: "IERC721A",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721A__factory>;

    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "ERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721>;
    getContractAt(
      name: "IERC721Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Metadata>;
    getContractAt(
      name: "IERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721>;
    getContractAt(
      name: "IERC721Receiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Receiver>;
    getContractAt(
      name: "ERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC165>;
    getContractAt(
      name: "IERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "DID",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DID>;
    getContractAt(
      name: "DID",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DID>;
    getContractAt(
      name: "Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Metadata>;
    getContractAt(
      name: "PayDID",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PayDID>;
    getContractAt(
      name: "Price",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Price>;
    getContractAt(
      name: "Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Metadata>;
    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "PavoID",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PavoID>;
    getContractAt(
      name: "Price",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Price>;
    getContractAt(
      name: "SBT",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SBT>;
    getContractAt(
      name: "DAOTask",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DAOTask>;
    getContractAt(
      name: "DAOTaskOrder",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DAOTaskOrder>;
    getContractAt(
      name: "DAOTaskOrderNFT",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DAOTaskOrderNFT>;
    getContractAt(
      name: "POAP",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.POAP>;
    getContractAt(
      name: "ERC721A__IERC721Receiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721A__IERC721Receiver>;
    getContractAt(
      name: "ERC721A",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721A>;
    getContractAt(
      name: "IERC721A",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721A>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}

import { utils } from 'ethers';
import { ethers, run } from 'hardhat';

const main = async () => {
  // Compile contracts
  // await run("compile");
  // console.log("Compiled contracts.");
  const PayDID = await ethers.getContractFactory('PayDID');
  const payDId = await PayDID.deploy();
  await payDId.deployed();

  console.log('payDId deploy to ', payDId.address);
  const [deployer] = await ethers.getSigners();

  // await (await pavoId.mintByOwner(deployer.address, "hello")).wait();
  // console.log("minted");
  // console.log(await pavoId.tokenIdToDid(1));
  // console.log(await pavoId.tokenURI(1));
  await payDId.updateOpen(true);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

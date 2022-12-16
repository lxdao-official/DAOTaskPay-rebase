import { utils } from 'ethers';
import { ethers, run } from 'hardhat';

const main = async () => {
  // Compile contracts
  // await run("compile");
  // console.log("Compiled contracts.");
  const POAP = await ethers.getContractFactory('POAP');
  const poap = await POAP.deploy();
  await poap.deployed();

  console.log('poap deploy to ', poap.address);

  const DAOTask = await ethers.getContractFactory('DAOTask');
  const daotask = await DAOTask.deploy(poap.address);
  await daotask.deployed();

  console.log('daotask deploy to ', daotask.address);
  const [deployer] = await ethers.getSigners();
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

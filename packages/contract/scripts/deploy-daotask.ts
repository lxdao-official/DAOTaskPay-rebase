import { utils } from 'ethers';
import { ethers, run } from 'hardhat';

const main = async () => {
  // Compile contracts
  // await run("compile");
  // console.log("Compiled contracts.");
  const POAP = await ethers.getContractFactory('POAP');
  const poapforpublisher = await POAP.deploy('POAP For Publisher', 'poapforpublisher');
  await poapforpublisher.deployed();
  const poapforemployer = await POAP.deploy('POAP For Employer', 'poapforemployer');
  await poapforemployer.deployed();
  const poapforintercessor = await POAP.deploy('POAP For Intercessor', 'poapforintercessor');
  await poapforintercessor.deployed();

  console.log('poapforpublisher deploy to ', poapforpublisher.address);
  console.log('poapforemployer deploy to ', poapforemployer.address);
  console.log('poapforintercessor deploy to ', poapforintercessor.address);

  const DAOTask = await ethers.getContractFactory('DAOTask');
  const daotask = await DAOTask.deploy(
    poapforpublisher.address,
    poapforemployer.address,
    poapforintercessor.address,
  );
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

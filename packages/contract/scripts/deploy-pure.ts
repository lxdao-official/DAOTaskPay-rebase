import { utils } from 'ethers';
import { ethers, run } from 'hardhat';

const main = async () => {
  // Compile contracts
  await run("compile");
  

  const DAOTask = await ethers.getContractFactory('DAOTask');
  const daotask = await DAOTask.deploy(
    "0xDA61D0bafaF752524D8E0dc32E84f82589a09cA0",
    "0xF5724506fa500802be56b66790d127f49Aba7A6A",
    "0x7edEcbd201c8AE2440D280f68E306c985b58FEDB",
  );
  await daotask.deployed();

  console.log('daotask deploy to ', daotask.address);
  const [deployer] = await ethers.getSigners();
  const myStructData = ethers.utils.AbiCoder.prototype.encode(
  ['address','address','address', 'string', 'string','address','uint256','uint256[]'],
  ["0xbbA51F0b09d5852eFfa609E9223ba7F5d7407945","0x5291f4792A8da3BcF699f3876De3904e970b146C",'0x5291f4792A8da3BcF699f3876De3904e970b146C','str','title',"0x5291f4792A8da3BcF699f3876De3904e970b146C",123231,[]]
);
  console.log(myStructData)
  // await daotask.createOrderGroup(myStructData,[100,100],[1671299245,1671299248],'0x0bcad17ecf260d6506c6b97768bdc2acfb6694445d27ffd3f9c1cfbee4a9bd6d','0x0bcad17ecf260d6506c6b97768bdc2acfb6694445d27ffd3f9c1cfbee4a9bd6d','0x0bcad17ecf260d6506c6b97768bdc2acfb6694445d27ffd3f9c1cfbee4a9bd6d')
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

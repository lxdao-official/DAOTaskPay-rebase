import { BigNumber, utils } from "ethers";
import { ethers, run } from "hardhat";

const main = async () => {
  // Compile contracts
  // await run("compile");
  // console.log("Compiled contracts.");
  const [deployer] = await ethers.getSigners();
  console.log("deployer.address", deployer.address);
  const POAP = await ethers.getContractFactory("POAP");
  const poapforpublisher = await POAP.deploy("POAP For Publisher", "poapforpublisher");
  await poapforpublisher.deployed();
  const poapforemployer = await POAP.deploy("POAP For Employer", "poapforemployer");
  await poapforemployer.deployed();
  const poapforintercessor = await POAP.deploy("POAP For Intercessor", "poapforintercessor");
  await poapforintercessor.deployed();

  console.log("poapforpublisher deploy to ", poapforpublisher.address);
  console.log("poapforemployer deploy to ", poapforemployer.address);
  console.log("poapforintercessor deploy to ", poapforintercessor.address);

  const DAOTask = await ethers.getContractFactory("DAOTask");
  const daotask = await DAOTask.deploy(
    poapforpublisher.address,
    poapforemployer.address,
    poapforintercessor.address
  );
  await daotask.deployed();

  const ERC20 = await ethers.getContractFactory("MockERC20");
  const token = await ERC20.deploy("Test Token", "TT", utils.parseEther("100000000000"));
  await token.deployed();

  console.log("token deploy to ", token.address);

  await (
    await token.connect(deployer).approve(daotask.address, utils.parseEther("100000000000"))
  ).wait();
  // await (
  //   await daotask.createOrderGroup(
  //     {
  //       token: token.address,
  //       title: "测试",
  //       publisher: deployer.address,
  //       employer: deployer.address,
  //       intercessor: deployer.address,
  //       metadataURI: "",
  //       orders: [],
  //     },
  //     [utils.parseEther("100"), utils.parseEther("1200")],
  //     [
  //       BigNumber.from(String(Math.floor(new Date().getTime() / 1000) + 100000)),
  //       BigNumber.from(String(Math.floor(new Date().getTime() / 1000) + 100000)),
  //     ],
  //   )
  // ).wait();

  console.log("begin createOrderGroup");
  await (
    await daotask.createOrderGroup(
      deployer.address,
      deployer.address,
      deployer.address,
      "测试",
      "",
      token.address,
      [utils.parseEther("100"), utils.parseEther("1200")],
      [
        BigNumber.from(String(Math.floor(new Date().getTime() / 1000) + 1000000)),
        BigNumber.from(String(Math.floor(new Date().getTime() / 1000) + 1000000)),
      ],
      [
        "0xccdc5fcfbc73297efce8cc4794268da0583781d26f96a65589417e42dfafb1882daf4b52b3e0caef59cb9d33dfd3cd96cd475c4c210a53f24c5ce8a8ab8752e81b",
        "0xccdc5fcfbc73297efce8cc4794268da0583781d26f96a65589417e42dfafb1882daf4b52b3e0caef59cb9d33dfd3cd96cd475c4c210a53f24c5ce8a8ab8752e81b",
        "0xccdc5fcfbc73297efce8cc4794268da0583781d26f96a65589417e42dfafb1882daf4b52b3e0caef59cb9d33dfd3cd96cd475c4c210a53f24c5ce8a8ab8752e81b",
      ]
      // "0xccdc5fcfbc73297efce8cc4794268da0583781d26f96a65589417e42dfafb1882daf4b52b3e0caef59cb9d33dfd3cd96cd475c4c210a53f24c5ce8a8ab8752e81b",
      // "0xccdc5fcfbc73297efce8cc4794268da0583781d26f96a65589417e42dfafb1882daf4b52b3e0caef59cb9d33dfd3cd96cd475c4c210a53f24c5ce8a8ab8752e81b",
      // "0xccdc5fcfbc73297efce8cc4794268da0583781d26f96a65589417e42dfafb1882daf4b52b3e0caef59cb9d33dfd3cd96cd475c4c210a53f24c5ce8a8ab8752e81b"
    )
  ).wait();
  await (
    await daotask.createOrderGroup(
      deployer.address,
      deployer.address,
      deployer.address,
      "测试2",
      "",
      token.address,
      [utils.parseEther("100"), utils.parseEther("1200")],
      [
        BigNumber.from(String(Math.floor(new Date().getTime() / 1000) + 1000000)),
        BigNumber.from(String(Math.floor(new Date().getTime() / 1000) + 1000000)),
      ],
      [
        "0xccdc5fcfbc73297efce8cc4794268da0583781d26f96a65589417e42dfafb1882daf4b52b3e0caef59cb9d33dfd3cd96cd475c4c210a53f24c5ce8a8ab8752e81b",
        "0xccdc5fcfbc73297efce8cc4794268da0583781d26f96a65589417e42dfafb1882daf4b52b3e0caef59cb9d33dfd3cd96cd475c4c210a53f24c5ce8a8ab8752e81b",
        "0xccdc5fcfbc73297efce8cc4794268da0583781d26f96a65589417e42dfafb1882daf4b52b3e0caef59cb9d33dfd3cd96cd475c4c210a53f24c5ce8a8ab8752e81b",
      ]
      // "0xccdc5fcfbc73297efce8cc4794268da0583781d26f96a65589417e42dfafb1882daf4b52b3e0caef59cb9d33dfd3cd96cd475c4c210a53f24c5ce8a8ab8752e81b",
      // "0xccdc5fcfbc73297efce8cc4794268da0583781d26f96a65589417e42dfafb1882daf4b52b3e0caef59cb9d33dfd3cd96cd475c4c210a53f24c5ce8a8ab8752e81b",
      // "0xccdc5fcfbc73297efce8cc4794268da0583781d26f96a65589417e42dfafb1882daf4b52b3e0caef59cb9d33dfd3cd96cd475c4c210a53f24c5ce8a8ab8752e81b"
    )
  ).wait();

  console.log(await daotask.getPublishersOrderGroups(deployer.address));
  console.log("daotask deploy to ", daotask.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

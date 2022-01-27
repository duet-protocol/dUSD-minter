const { ethers, network } = require("hardhat");

const { writeAddr } = require('./artifact_log.js');


async function main() {
  let [owner]  = await ethers.getSigners();

  console.log("owner:" + owner.address)

  const LinkUSDOracle = await ethers.getContractFactory("LinkUSDOracle");
  const linkOracle = await LinkUSDOracle.deploy();
  await linkOracle.deployed();

  console.log("LinkUSDOracle deployed to:", linkOracle.address);
  
  await writeAddr(linkOracle.address, "LinkUSDOracle", network.name)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });


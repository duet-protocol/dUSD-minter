const { ethers, network } = require("hardhat");

const { writeAddr } = require('./artifact_log.js');


async function main() {
  let [owner]  = await ethers.getSigners();

  const DUSD = await ethers.getContractFactory("DUSD");
  const dusd = await DUSD.deploy();
  await dusd.deployed();

  console.log("DUSD deployed to:", dusd.address);
  
  await writeAddr(dusd.address, "DUSD", network.name)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });


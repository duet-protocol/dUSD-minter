const { ethers, network } = require("hardhat");

const { writeAddr } = require('./artifact_log.js');

const USDC_Addr = require(`../abis/USDC.${network.name}.json`)
const DUSD_Addr = require(`../abis/DUSD.${network.name}.json`)
const LinkUSDOracle_Addr = require(`../abis/LinkUSDOracle.${network.name}.json`)

async function main() {
  let [owner]  = await ethers.getSigners();

  const DuetUSDMinerPair = await ethers.getContractFactory("DuetUSDMinerPair");
  const pair = await DuetUSDMinerPair.deploy(USDC_Addr.address, LinkUSDOracle_Addr.address, DUSD_Addr.address, owner.address);
  await pair.deployed();

  console.log("DuetUSDMinerPair deployed to:", pair.address);
  
  await writeAddr(pair.address, "USDC-DUSD-Pair", network.name)

  // DuetUSDMinerPair as DUSD miner
  let dusd =  await ethers.getContractAt("DUSD",
    DUSD_Addr.address,
    owner);

  await dusd.addMiner(pair.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });


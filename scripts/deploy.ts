import { ethers } from "hardhat";

async function main() {
  const corgi = await ethers.deployContract("Corgi");

  await corgi.waitForDeployment();

  console.log(`Corgi deployed to ${corgi.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Contract Address ->

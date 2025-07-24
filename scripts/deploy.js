const hre = require("hardhat");

async function main() {
  const DAOVotingFactory = await hre.ethers.getContractFactory("DAOVoting");
  const dao = await DAOVotingFactory.deploy(); // Note: no parentheses after deploy

  await dao.waitForDeployment(); // Replaces dao.deployed() in ethers v6

  console.log("DAOVoting deployed to:", await dao.getAddress()); // use getAddress() instead of .address
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

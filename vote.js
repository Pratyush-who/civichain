// vote.js
const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // Replace with your deployed contract address
  const proposalId = 0; // The ID of the proposal you want to vote on
  const support = true; // true = vote YES, false = vote NO

  const dao = await ethers.getContractAt("DAOVoting", contractAddress);
  const [voter] = await ethers.getSigners();

  console.log(`🗳 Voting on proposal ${proposalId} as ${voter.address}...`);

  const tx = await dao.connect(voter).vote(proposalId, support);
  await tx.wait();

  console.log(`✅ Vote cast successfully! You voted '${support ? "YES" : "NO"}'.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

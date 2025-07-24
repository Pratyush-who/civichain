const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // your deployed address
  const dao = await ethers.getContractAt("DAOVoting", contractAddress);

  const tx = await dao.createProposal("Test Proposal", 5); // 5 minutes
  await tx.wait();

  console.log("✅ Proposal created!");
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

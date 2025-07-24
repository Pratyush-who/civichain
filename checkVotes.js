const { ethers } = require("hardhat");

async function main() {
  try {
    const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

    const dao = await ethers.getContractAt("DAOVoting", contractAddress);

    const proposalCount = await dao.proposalCount();
    console.log(`📊 Total Proposals: ${proposalCount.toString()}`);

    if (proposalCount.isZero()) {
      console.log("No proposals found.");
      return;
    }

    for (let i = 0; i < proposalCount.toNumber(); i++) {
      const proposal = await dao.getProposal(i);
      console.log(`\n📝 Proposal #${proposal.id.toString()}`); 
      console.log(`📋 Description: ${proposal.description}`);
      console.log(`✅ Yes Votes: ${proposal.voteCountYes.toString()}`);
      console.log(`❌ No Votes: ${proposal.voteCountNo.toString()}`);
    }

    try {
      const winner = await dao.getWinningProposal();
      console.log(`🏆 Winning Proposal ID: ${winner.toString()}`);
    } catch (e) {
      console.log("No winner yet or error fetching winner.");
    }

  } catch (error) {
    console.error("Error fetching proposals:", error);
  }
}

main();

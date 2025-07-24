const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DAOVoting", function () {
  let dao;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const DAOVoting = await ethers.getContractFactory("DAOVoting");
    dao = await DAOVoting.deploy();
    console.log("Contract deployed to:", dao.address);

  });
  

  it("Should create a proposal", async function () {
    await dao.createProposal("Test Proposal", 10); // 10 minutes
    const proposal = await dao.getProposal(0);

    // proposal is a tuple: [id, description, voteCountYes, voteCountNo, deadline, executed]
    expect(proposal[1]).to.equal("Test Proposal");
  });

  it("Should allow voting", async function () {
    await dao.createProposal("Test Proposal", 10);

    await dao.connect(addr1).vote(0, true); // addr1 votes yes
    const proposal = await dao.getProposal(0);

    expect(proposal[2]).to.equal(1); // voteCountYes is at index 2
  });

  it("Should prevent double voting", async function () {
    await dao.createProposal("Test Proposal", 10);

    await dao.connect(addr1).vote(0, true);

    await expect(
      dao.connect(addr1).vote(0, false)
    ).to.be.revertedWith("Already voted");
  });
});

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DAOVoting {
    struct Proposal {
        uint id;
        string description;
        uint voteCountYes;
        uint voteCountNo;
        uint deadline;
        bool executed;
        mapping(address => bool) hasVoted;
    }

    uint public proposalCount;
    mapping(uint => Proposal) public proposals;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    modifier proposalExists(uint _id) {
        require(_id < proposalCount, "Proposal does not exist");
        _;
    }

    function createProposal(string memory _description, uint _durationMinutes) public onlyOwner {
        Proposal storage newProposal = proposals[proposalCount];
        newProposal.id = proposalCount;
        newProposal.description = _description;
        newProposal.deadline = block.timestamp + (_durationMinutes * 1 minutes);
        proposalCount++;
    }

    function vote(uint _proposalId, bool support) public proposalExists(_proposalId) {
        Proposal storage proposal = proposals[_proposalId];

        require(block.timestamp <= proposal.deadline, "Voting period ended");
        require(!proposal.hasVoted[msg.sender], "Already voted");

        proposal.hasVoted[msg.sender] = true;

        if (support) {
            proposal.voteCountYes++;
        } else {
            proposal.voteCountNo++;
        }
    }

    function executeProposal(uint _proposalId) public proposalExists(_proposalId) {
        Proposal storage proposal = proposals[_proposalId];
        require(block.timestamp > proposal.deadline, "Voting not ended");
        require(!proposal.executed, "Already executed");

        // Add execution logic here (e.g., trigger some DAO action)

        proposal.executed = true;
    }

    function getProposal(uint _proposalId) public view proposalExists(_proposalId) returns (
        uint id,
        string memory description,
        uint voteCountYes,
        uint voteCountNo,
        uint deadline,
        bool executed
    ) {
        Proposal storage proposal = proposals[_proposalId];
        return (
            proposal.id,
            proposal.description,
            proposal.voteCountYes,
            proposal.voteCountNo,
            proposal.deadline,
            proposal.executed
        );
    }
}

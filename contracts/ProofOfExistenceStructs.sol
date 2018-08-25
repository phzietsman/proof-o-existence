pragma solidity ^0.4.23;

/** @title ProofOfExistenceStructs - for custom "data types" */
contract ProofOfExistenceStructs {
  
  enum EndorseStatus { NoVote, UpVote, DownVote }

  struct BioObject {
    string name;
    string ipfs;
    uint blockNumber;
  }

  struct ClaimObject {
    string name;
    string ipfs;
    uint blockNumber;
    uint upVoteCount;
    uint downVoteCount;
    mapping (address => EndorseStatus) Endorsements;
  }

}
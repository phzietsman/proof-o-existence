pragma solidity ^0.4.23;

contract ProofOfExistenceStructs {
  
  struct Claim {
    string name;
    string description;
    string ipfs;
    uint blockNumber;
  }

  struct Bio {
    string name;
    string ipfs;
    uint index;
  }

}
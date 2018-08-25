pragma solidity ^0.4.23;

/** @title ProofOfExistenceEvents - all the events listed here */
contract ProofOfExistenceEvents {
  event NewAddressRegistered ( address _newAddress ); 
  event NewClaim ( address _address, uint _claimIndex ); 
  event UpVote ( address _address, uint _claimIndex ); 
  event DownVote ( address _address, uint _claimIndex ); 
}
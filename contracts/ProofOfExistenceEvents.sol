pragma solidity ^0.4.23;

contract ProofOfExistenceEvents {

  event NewAddressRegistered ( address _newAddress ); 
  event NewClaim ( address _address, uint _claimIndex ); 

}
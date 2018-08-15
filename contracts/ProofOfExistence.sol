pragma solidity ^0.4.23;

contract ProofOfExistence {
  
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

  address[] private registeredAddresses;

  mapping(address => Claim[]) private addressClaimIndex;
  mapping(address => Bio) private addressBio;


  constructor() public {  }

  /** @dev Returns a claim for a given index
    * @param _index The index for the claim to return
    * @return name xxx
    * @return description yyy
    * @return ipfs The zzz
    * @return blockNumber aaa
  */
  function getClaim (address _address, uint256 _index)
  public
  view
  returns (string name, string description, string ipfs, uint blockNumber)
  {
    Claim memory thisClaim = addressClaimIndex[_address][_index];
    return (thisClaim.name, thisClaim.description, thisClaim.ipfs, thisClaim.blockNumber);
  }

  function getBio (address _address)
  public
  view
  returns (string name, string ipfs)
  {
    Bio memory thisBio = addressBio[_address];
    return (thisBio.name, thisBio.ipfs);
  }

  function getRegisteredAddress (uint256 _index)
  public
  view
  returns (address)
  {
    return registeredAddresses[_index];
  }

  function getRegisteredAddressCount ()
  public
  view
  returns (uint count)
  {
    return registeredAddresses.length;
  }

  function register (string name, string bioIpfs)
  public
  returns (uint count)
  {
    return registeredAddresses.length;
  }


}

pragma solidity ^0.4.23;

import "./ProofOfExistenceEvents.sol";
import "./ProofOfExistenceStructs.sol";

import "./openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract ProofOfExistence is ProofOfExistenceEvents, ProofOfExistenceStructs, Ownable {

  // ================================================  
  // Storage
  // ================================================
  address[] private registeredAddresses;

  mapping(address => Claim[]) private addressClaimIndex;
  mapping(address => Bio) private addressBio;

  // ================================================  
  // Modifiers
  // ================================================
  modifier onlyRegisteredAddresses() {
    Bio memory thisAddressBio = addressBio[msg.sender];
    require(thisAddressBio.index > 0, "AddresNotRegistered");
    _;
  }

  modifier onlyNewAddresses() {
    Bio memory thisAddressBio = addressBio[msg.sender];
    require(thisAddressBio.index == 0, "AddresAlreadyRegistered");
    _;
  }

  constructor() public { 
    // Create a blank bio, such that there will never be a valid address 
    // at any index 0;
    address zeroAddress = 0x0;
    registeredAddresses.push(zeroAddress);
    addressBio[zeroAddress] = Bio("ZeroAddress", "", 0);
  }

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

  function registerAddress (string _name, string _ipfs)
  public
  onlyNewAddresses
  returns (uint addressIndex)
  {
    addressIndex = registeredAddresses.push(msg.sender) - 1;
    addressBio[msg.sender] = Bio(_name, _ipfs, addressIndex);
    emit NewAddressRegistered(msg.sender);
  }

  function updateBio (string _name, string _ipfs)
  public
  onlyRegisteredAddresses
  returns (uint)
  {
    addressBio[msg.sender].name = _name; 
    addressBio[msg.sender].ipfs = _ipfs; 
    return addressBio[msg.sender].index;
  }

}

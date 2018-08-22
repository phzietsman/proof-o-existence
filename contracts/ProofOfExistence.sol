pragma solidity ^0.4.23;

import "./ProofOfExistenceEvents.sol";
import "./ProofOfExistenceStructs.sol";

import "./openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract ProofOfExistence is ProofOfExistenceEvents, ProofOfExistenceStructs, Ownable {

  // ================================================  
  // Storage
  // ================================================
  address[] private registeredAddresses;

  mapping(address => IpfsObject[]) private addressClaim;
  mapping(address => IpfsObject) private addressBio;

  // ================================================  
  // Modifiers
  // ================================================
  modifier onlyRegisteredAddresses() {
    IpfsObject memory thisAddressBio = addressBio[msg.sender];
    require(thisAddressBio.blockNumber > 0, "AddresNotRegistered");
    _;
  }

  modifier onlyNewAddresses() {
    IpfsObject memory thisAddressBio = addressBio[msg.sender];
    require(thisAddressBio.blockNumber == 0, "AddresAlreadyRegistered");
    _;
  }

  constructor() public { 
    // Create a blank bio, such that there will never be a valid address 
    // at any index 0;
    address zeroAddress = 0x0;
    registeredAddresses.push(zeroAddress);
    addressBio[zeroAddress] = IpfsObject("ZeroAddress", "", 0);
  }

  function getClaim (address _address, uint256 _index)
  public
  view
  returns (string claimName, string claimIpfs, uint claimBlockNumber)
  {
    IpfsObject memory thisClaim = addressClaim[_address][_index];
    return (thisClaim.name, thisClaim.ipfs, thisClaim.blockNumber);
  }

  function createClaim (string name, string ipfs)
  public
  returns (uint claimBlockNumber)
  {
    IpfsObject memory newClaim = IpfsObject(name, ipfs, block.number);
    addressClaim[msg.sender].push(newClaim);
    return block.number;
  }

  function getClaimCount (address _address)
  public
  view
  returns (uint)
  {
    return addressClaim[_address].length;   
  }

  function getBio (address _address)
  public
  view
  returns (string name, string ipfs, uint blockNumber)
  {
    IpfsObject memory thisBio = addressBio[_address];
    return (thisBio.name, thisBio.ipfs, thisBio.blockNumber);
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
    // addressBio[msg.sender] = Bio(_name, _ipfs, addressIndex);
    addressBio[msg.sender].name = _name;
    addressBio[msg.sender].ipfs = _ipfs;
    addressBio[msg.sender].blockNumber = block.number;

    emit NewAddressRegistered(msg.sender);
  }

  function updateBio (string _name, string _ipfs)
  public
  onlyRegisteredAddresses
  returns (uint)
  {
    addressBio[msg.sender].name = _name; 
    addressBio[msg.sender].ipfs = _ipfs; 
    addressBio[msg.sender].blockNumber = block.number;
    return addressBio[msg.sender].blockNumber;
  }

}

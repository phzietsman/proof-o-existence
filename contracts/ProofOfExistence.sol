pragma solidity ^0.4.23;

import "./ProofOfExistenceEvents.sol";
import "./ProofOfExistenceStructs.sol";

import "./openzeppelin-solidity/contracts/ownership/Ownable.sol";

/** @title ProofOfExistence - main contract with all the storage and functions */
contract ProofOfExistence is ProofOfExistenceEvents, ProofOfExistenceStructs, Ownable {

  // ================================================  
  // Storage
  // ================================================
  address[] private registeredAddresses;

  mapping(address => ClaimObject[]) private addressClaim;
  mapping(address => BioObject) private addressBio;

  // ================================================  
  // Modifiers
  // ================================================
  modifier onlyRegisteredAddresses() {
    BioObject memory thisAddressBio = addressBio[msg.sender];
    require(thisAddressBio.blockNumber > 0, "AddresNotRegistered");
    _;
  }

  modifier onlyNewAddresses() {
    BioObject memory thisAddressBio = addressBio[msg.sender];
    require(thisAddressBio.blockNumber == 0, "AddresAlreadyRegistered");
    _;
  }

  constructor() public { 
    address zeroAddress = 0x0;
    registeredAddresses.push(zeroAddress);
    addressBio[zeroAddress] = BioObject("ZeroAddress", "", 0);
  }

  function getClaim (address _address, uint256 _index)
  public
  view
  returns (string claimName, string claimIpfs, uint claimBlockNumber, uint upVote, uint downVote)
  {
    ClaimObject memory thisClaim = addressClaim[_address][_index];
    return (thisClaim.name, thisClaim.ipfs, thisClaim.blockNumber, thisClaim.upVoteCount, thisClaim.downVoteCount);
  }

  function createClaim (string _name, string _ipfs)
  public
  onlyRegisteredAddresses
  returns (uint claimBlockNumber)
  {
    ClaimObject memory newClaim = ClaimObject(_name, _ipfs, block.number, 0, 0);
    addressClaim[msg.sender].push(newClaim);
    emit NewClaim(msg.sender, addressClaim[msg.sender].length - 1);
    return block.number;
  }

  function upVoteClaim (address _address, uint256 _index)
  public
  onlyRegisteredAddresses
  returns (uint claimBlockNumber)
  {
    EndorseStatus currentVote = addressClaim[_address][_index].Endorsements[msg.sender];

    if(currentVote == EndorseStatus.DownVote) {
      addressClaim[_address][_index].downVoteCount -= 1;
    } else if(currentVote == EndorseStatus.UpVote) {
      addressClaim[_address][_index].upVoteCount -= 1;
    }

    addressClaim[_address][_index].upVoteCount += 1;
    addressClaim[_address][_index].Endorsements[msg.sender] = EndorseStatus.UpVote;
    
    emit UpVote(_address, _index);
    return block.number;
  }

  function downVoteClaim (address _address, uint256 _index)
  public
  onlyRegisteredAddresses
  returns (uint claimBlockNumber)
  {
    EndorseStatus currentVote = addressClaim[_address][_index].Endorsements[msg.sender];

    if(currentVote == EndorseStatus.DownVote) {
      addressClaim[_address][_index].downVoteCount -= 1;
    } else if(currentVote == EndorseStatus.UpVote) {
      addressClaim[_address][_index].upVoteCount -= 1;
    }

    addressClaim[_address][_index].downVoteCount += 1;
    addressClaim[_address][_index].Endorsements[msg.sender] = EndorseStatus.DownVote;
    
    emit DownVote(_address, _index);
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
    BioObject memory thisBio = addressBio[_address];
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
    return addressBio[msg.sender].blockNumber;
  }

}

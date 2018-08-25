pragma solidity ^0.4.23;

import "./ProofOfExistenceEvents.sol";
import "./ProofOfExistenceStructs.sol";

import "./openzeppelin-solidity/contracts/ownership/Ownable.sol";

/** @title ProofOfExistence - main contract with all the storage and functions*/
contract ProofOfExistence is ProofOfExistenceEvents, ProofOfExistenceStructs, Ownable {

  // ================================================  
  // Storage
  // ================================================
  
  // This is used to keep track of all the registered
  // users for the UI to be able to fetch all the claims
  address[] private registeredAddresses;

  // Each registered user can have many claims
  mapping(address => ClaimObject[]) private addressClaim;

  // Each registered user only have one bio
  mapping(address => BioObject) private addressBio;

  // Contract can be paused to prevent new content from eing created
  bool private paused = false;

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

  modifier onlyIfNotPaused() {
    require(!paused, "Contracted is paused");
    _;
  }

  constructor() public { 
    address zeroAddress = 0x0;
    registeredAddresses.push(zeroAddress);
    addressBio[zeroAddress] = BioObject("ZeroAddress", "", 0);
  }

  // ================================================  
  // Functions
  // ================================================

  // Claims =========================================

  /** @dev Create a claim, these are added to the addressClaim storage variable
    * @param _name Name of the claim, this should correspond to the claim in the ipfs object
    * @param _ipfs the ipfs hash / address. Should *not* include ipfs/ in the address
    * @return claimBlockNumber the block in which this claim is included
    */
  function createClaim (string _name, string _ipfs)
  public
  onlyIfNotPaused
  onlyRegisteredAddresses
  returns (uint claimBlockNumber)
  {
    ClaimObject memory newClaim = ClaimObject(_name, _ipfs, block.number, 0, 0);
    addressClaim[msg.sender].push(newClaim);
    emit NewClaim(msg.sender, addressClaim[msg.sender].length - 1);
    return block.number;
  }

  /** @dev Gets the number of claims for a given address
    * @param _address claim owner address in question
    * @return the number of claims
    */
  function getClaimCount (address _address)
  public
  view
  returns (uint)
  {
    return addressClaim[_address].length;   
  }

  /** @dev Gets the claim for an address at a spesific index
    * @param _address The address in question
    * @param _index The index in question
    * @return claimName Name of the claim
    * @return claimIpfs claim ipfs address
    * @return claimBlockNumber block in which the claim was included 
    * @return upVote number of times the claim was indorsed 
    * @return downVote number of times the claim was un-indorsed 
    */
  function getClaim (address _address, uint256 _index)
  public
  view
  returns (string claimName, string claimIpfs, uint claimBlockNumber, uint upVote, uint downVote)
  {
    ClaimObject memory thisClaim = addressClaim[_address][_index];
    return (thisClaim.name, thisClaim.ipfs, thisClaim.blockNumber, thisClaim.upVoteCount, thisClaim.downVoteCount);
  }

  // Endorsing ======================================

  /** @dev Promote a claim by indorsing it
    * @param _address claim owner address in question
    * @param _index claim index in question
    * @return claimBlockNumber block in which the vote was included 
    */
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

  /** @dev Down vote a claim if you think / know its false
    * @param _address claim owner address in question
    * @param _index claim index in question
    * @return claimBlockNumber block in which the vote was included 
    */
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

  // User ===========================================

  /** @dev Register to use PoE 
    * @param _name Name of the to user in PoE, this should correspond to the name in the ipfs object
    * @param _ipfs the ipfs hash / address of bio. Should *not* include ipfs/ in the address
    * @return claimBlockNumber the block in which this bio is included
    */
  function registerAddress (string _name, string _ipfs)
  public
  onlyIfNotPaused
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
  
  /** @dev Gets the number of regitered addresses
    * @return the number addresses
    */
  function getRegisteredAddressCount ()
  public
  view
  returns (uint count)
  {
    return registeredAddresses.length;
  }

  /** @dev Fetch an address at a spesific index 
    * @param _index The index in question
    * @return address address of a registered user 
    */
  function getRegisteredAddress (uint256 _index)
  public
  view
  returns (address)
  {
    return registeredAddresses[_index];
  }

  /** @dev The the bio of a registered user
    * @param _address user address in question
    * @return name user name
    * @return ipfs user bio ipfs address
    * @return blockNumber block in which the bio was created 
    */
  function getBio (address _address)
  public
  view
  returns (string name, string ipfs, uint blockNumber)
  {
    BioObject memory thisBio = addressBio[_address];
    return (thisBio.name, thisBio.ipfs, thisBio.blockNumber);
  }

  /** @dev Update you bio if registered, does not updated the blocknumber in which the user was registred
    * @param _name new user name
    * @param _ipfs new ipfs address
    * @return block in which the bio was updated 
    */
  function updateBio (string _name, string _ipfs)
  public
  onlyIfNotPaused
  onlyRegisteredAddresses
  returns (uint)
  {
    addressBio[msg.sender].name = _name; 
    addressBio[msg.sender].ipfs = _ipfs; 
    return addressBio[msg.sender].blockNumber;
  }

  // Admin ===========================================

  /** @dev Pause the contract if needed
    */
  function pauseContract ()
  public
  onlyOwner
  {
    paused = true;
  }

  /** @dev Pause the contract if needed
    */
  function unpauseContract ()
  public
  onlyOwner
  {
    paused = false;
  }


}

pragma solidity ^0.4.23;



contract ProofOfExistence {
  
	struct Claim {
		string name;
		string description;
		string dataHash;
		string ipfs;
		uint block;
	}

	struct Endorsement {
		uint8 state;
		uint block;
		address endorser;
		string ipfs;
	}

	Event NewEndorsementRequest (uint _endorsementId, uint _claimId);

	Claim[] public Claims;
	Endorsement[] public Endorsements;

	mapping(address => int[])  AddressClaims;
	mapping(address => int[])  AddressEndorsements;

	mapping(int => int[])  ClaimEndorsement;

	mapping(address => string)  AddressPublicKey;
	mapping(string => address)  PublicKeyAddress;

  // constructor() public {  }

	/** @dev Calculates a rectangle's surface and perimeter.
		* @param w Width of the rectangle.
		* @param h Height of the rectangle.
		* @return s The calculated surface.
		* @return p The calculated perimeter.
		*/
	
}

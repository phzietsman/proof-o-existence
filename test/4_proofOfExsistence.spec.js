const ProofOfExistence = artifacts.require("ProofOfExistence");

contract('ProofOfExistence Events', async (accounts) => {

  const Bob = accounts[0];
  const claimIndex = 0;

  function assertEventOfType (response, eventName, index) {
    assert.equal(response.logs[index].event, eventName, eventName + ' event should fire.');
  }


  it("should emit NewAddressRegistered when registering", async () => {
    let instance = await ProofOfExistence.deployed();
    let event = await instance.registerAddress("Bob", "ipfs", { from: Bob });

    assertEventOfType(event, "NewAddressRegistered", 0);
  })

  it("should emit NewClaim when creating a claim", async () => {
    let instance = await ProofOfExistence.deployed();
    let event = await instance.createClaim("Bob's First Claim", "bob_first_claim_ipfs", {from: Bob});

    assertEventOfType(event, "NewClaim", 0);
  })

  it("should emit UpVote when UpVoting", async () => {
    let instance = await ProofOfExistence.deployed();
    let event = await instance.upVoteClaim(Bob, claimIndex, { from: Bob });

    assertEventOfType(event, "UpVote", 0);
  })

  it("should emit DownVote when DownVoting", async () => {
    let instance = await ProofOfExistence.deployed();
    let event = await instance.upVoteClaim(Bob, claimIndex, { from: Bob });

    assertEventOfType(event, "UpVote", 0);
  })

  
})
const ProofOfExistence = artifacts.require("ProofOfExistence");

contract('ProofOfExistence Claims', async (accounts) => {

  // Registered should be able to create a claim. Claims must
  // initialize with no up or down votes
  it("should be able to create a claim", async () => {
    let instance = await ProofOfExistence.deployed();
    await instance.registerAddress("Paul", "paul_ipfs", { from: accounts[0] });

    await instance.createClaim("My First Claim", "my_first_claim_ipfs", { from: accounts[0] });

    let claim = await instance.getClaim.call(accounts[0], 0, { from: accounts[0] });
    assert.equal(claim.valueOf()[0], "My First Claim");
    assert.equal(claim.valueOf()[1], "my_first_claim_ipfs");
    // upVotes
    assert.equal(claim.valueOf()[3], 0);
    // downVotes
    assert.equal(claim.valueOf()[4], 0);
  })

  // Want users to register before creating claims, this will allow other users
  // to get a list of all claims
  it("should only allow regitered users to create claims", async () => {
    let instance = await ProofOfExistence.deployed();

    try {
      await instance.registerAddress("Paul", "paul_ipfs", { from: accounts[1] });
      assert.equal("UnregisteredClaim", true);
    } catch (e) { }
  })

  // This is a convenience function to help the consumers of the contract know 
  // how many claims an address has
  it("should be able to get the number of claim for a given address", async () => {
    let instance = await ProofOfExistence.deployed();
    let claimCount = await instance.getClaimCount.call(accounts[0], { from: accounts[0] });

    assert.equal(claimCount.valueOf(), 1);
  })


})
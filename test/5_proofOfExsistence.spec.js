const ProofOfExistence = artifacts.require("ProofOfExistence");

contract('ProofOfExistence Admin', async (accounts) => {


  it("should only allow admin to pause", async () => {
    let instance = await ProofOfExistence.deployed();
    await instance.registerAddress("Bob", "ipfs", { from: accounts[0] });

    try {
      await instance.pauseContract({ from: accounts[1] });
      assert.equal("Paused", true);
    } catch(e) { }
    
  })

  it("should only allow admin to unpause", async () => {
    let instance = await ProofOfExistence.deployed();
    try {
      await instance.unpauseContract({ from: accounts[1] });
      assert.equal("UnPaused", true);

    } catch(e) { }
  })

  it("should not be able to register a new user when paused", async () => {
    let instance = await ProofOfExistence.deployed();
    await instance.pauseContract({ from: accounts[0] });
    
    try {
      await instance.registerAddress("Bob", "ipfs", { from: accounts[1] });
      assert.equal("Registered", true);

    } catch(e) { }
  })

  it("should not be able to create claim when paused", async () => {
    let instance = await ProofOfExistence.deployed();
    await instance.pauseContract({ from: accounts[0] });
    
    try {
      await instance.createClaim("Bob's First Claim", "bob_first_claim_ipfs", {from: accounts[0]});
      assert.equal("Claimed", true);

    } catch(e) { }
  })
  
})
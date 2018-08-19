const ProofOfExistence = artifacts.require("ProofOfExistence");

contract('ProofOfExistence Tests', async (accounts) => {

  it("should initialization contract with 0x00.. address", async () => {
    let instance = await ProofOfExistence.deployed();

    let count = await instance.getRegisteredAddressCount.call({from:accounts[0]});
    assert.equal(count.valueOf(), 1);

    let address = await instance.getRegisteredAddress.call(0, {from:accounts[0]});
    assert.equal(address.valueOf(), 0);

    let bio = await instance.getBio.call(address.valueOf(), {from:accounts[0]});
    assert.equal(bio.valueOf()[0], "ZeroAddress");
  })

 it("should be able to register a new address", async () => {
  let instance = await ProofOfExistence.deployed();
  await instance.registerAddress("Paul", "paul_ipfs", {from:accounts[0]});

  let bio = await instance.getBio.call(accounts[0], {from:accounts[0]});
  assert.equal(bio.valueOf()[0], "Paul");
  assert.equal(bio.valueOf()[1], "paul_ipfs");

 })

 it("only new addresses can call register", async () => {
     let instance = await ProofOfExistence.deployed();

     try {
      let addressIndexAgain = await instance.registerAddress("Paul", "paul_ipfs", {from:accounts[0]});
      assert.equal("DoubleRegistered", true);
     } catch (e) { }
 })

  it("should be able to update bio", async () => {
    let instance = await ProofOfExistence.deployed();

    await instance.updateBio("Paul_Updated", "paul_updated_ipfs", {from:accounts[0]});

    let bioUpdated = await instance.getBio.call(accounts[0], {from:accounts[0]});
    assert.equal(bioUpdated.valueOf()[0], "Paul_Updated");
    assert.equal(bioUpdated.valueOf()[1], "paul_updated_ipfs");
  })



  
})
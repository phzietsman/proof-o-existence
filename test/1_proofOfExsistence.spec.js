const ProofOfExistence = artifacts.require("ProofOfExistence");

contract('ProofOfExistence Basics', async (accounts) => {

  // Create a blank bio, such that there will never be a valid address 
  // at any index 0;
  it("should initialization contract with 0x00.. address", async () => {
    let instance = await ProofOfExistence.deployed();

    let count = await instance.getRegisteredAddressCount.call({ from: accounts[0] });
    assert.equal(count.valueOf(), 1);

    let address = await instance.getRegisteredAddress.call(0, { from: accounts[0] });
    assert.equal(address.valueOf(), 0);

    let bio = await instance.getBio.call(address.valueOf(), { from: accounts[0] });
    assert.equal(bio.valueOf()[0], "ZeroAddress");
  })

  // Users should be able to register to use the app. Registering allowes use
  // to create a simple loging page on the UI
  it("should be able to register a new address", async () => {
    let instance = await ProofOfExistence.deployed();
    await instance.registerAddress("Paul", "paul_ipfs", { from: accounts[0] });

    let bio = await instance.getBio.call(accounts[0], { from: accounts[0] });
    assert.equal(bio.valueOf()[0], "Paul");
    assert.equal(bio.valueOf()[1], "paul_ipfs");

  })

  // If allowed to reregister it would create double entries in
  // the list of registered addresses and create a false count in
  // number of active users 
  it("should only be able to register once", async () => {
    let instance = await ProofOfExistence.deployed();

    try {
      let addressIndexAgain = await instance.registerAddress("Paul", "paul_ipfs", { from: accounts[0] });
      assert.equal("DoubleRegistered", true);
    } catch (e) { }
  })

  // Users would want to change their name or ipfs bio link
  it("should be able to update bio", async () => {
    let instance = await ProofOfExistence.deployed();

    await instance.updateBio("Paul_Updated", "paul_updated_ipfs", { from: accounts[0] });

    let bioUpdated = await instance.getBio.call(accounts[0], { from: accounts[0] });
    assert.equal(bioUpdated.valueOf()[0], "Paul_Updated");
    assert.equal(bioUpdated.valueOf()[1], "paul_updated_ipfs");
  })

  // When users register they should be added to the list of registerd addresses and the 
  // the list but increase by 1
  it("should add the new addresses to the list of registed addresses", async () => {
    let instance = await ProofOfExistence.deployed();

    let numberOfRegistedAddressesInitally = await instance.getRegisteredAddressCount();

    await instance.registerAddress("Paul_2", "paul_ipfs_2", { from: accounts[1] });

    let numberOfRegistedAddressesAfterRegister = await instance.getRegisteredAddressCount();
    let registeredAddress = await instance.getRegisteredAddress(Number(numberOfRegistedAddressesAfterRegister.valueOf())-1);

    assert.equal(Number(numberOfRegistedAddressesAfterRegister.valueOf()), Number(numberOfRegistedAddressesInitally.valueOf())+1);
    assert.equal(registeredAddress.valueOf(), accounts[1]);

  })




})
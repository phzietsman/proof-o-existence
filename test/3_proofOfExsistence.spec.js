const ProofOfExistence = artifacts.require("ProofOfExistence");

contract('ProofOfExistence Endorsing', async (accounts) => {

  const Bob = accounts[0];
  const Alice = accounts[1];

  const unregistered = accounts[2];

  const claimIndex = 0;

  // Test Bootstrapping:
  // Register 3 users
  // Create one claim for Bob 
  it("Test bootstrapping", async () => {
    let instance = await ProofOfExistence.deployed();
    await instance.registerAddress("Bob", "ipfs", { from: Bob });
    await instance.registerAddress("Alice", "ipfs", { from: Alice });

    await instance.createClaim("Bob's First Claim", "bob_first_claim_ipfs", {from: Bob});

    let bobBio = await instance.getBio.call(Bob, { from: Bob }); 
    let aliceBio = await instance.getBio.call(Alice, { from: Bob }); 


    let claim = await instance.getClaim.call(Bob, claimIndex, { from: Bob });
    assert.equal(claim.valueOf()[0], "Bob's First Claim");
    assert.equal(claim.valueOf()[3], 0);
    assert.equal(claim.valueOf()[4], 0);

    assert.equal(bobBio.valueOf()[0], "Bob");
    assert.equal(aliceBio.valueOf()[0], "Alice");

  })

  // Want users to register before before voting
  it("should not allow un-regitered users to upvote a claim", async () => {
    let instance = await ProofOfExistence.deployed();

    try {
      await instance.upVoteClaim(Bob, claimIndex, { from: unregistered });
      assert.equal("UnregisteredUpVote", true);
    } catch (e) { }
  })

  // Want users to register before before voting
  it("should not allow un-regitered users to downvote a claim", async () => {
    let instance = await ProofOfExistence.deployed();

    try {
      await instance.downVoteClaim(Bob, claimIndex, { from: unregistered });
      assert.equal("UnregisteredUpVote", true);
    } catch (e) { }
  })

  // All registered users should be able to upvote a claim and the 
  // upvote count should increase per vote
  it("should only allow regitered users to upvote a claim", async () => {
    let instance = await ProofOfExistence.deployed();

    let claim = await instance.getClaim.call(Bob, claimIndex, { from: Bob });
    let upVoteCount = Number(claim.valueOf()[3]);
    let downVoteCount = Number(claim.valueOf()[4]);
  
    await instance.upVoteClaim(Bob, claimIndex, { from: Bob });
  
    let claimAfterVotes = await instance.getClaim.call(Bob, claimIndex, { from: Bob });
    let upVoteCountAfterVotes = Number(claimAfterVotes.valueOf()[3]);
    let downVoteCountAfterVotes = Number(claimAfterVotes.valueOf()[4]);

    assert.equal(upVoteCountAfterVotes - upVoteCount, 1);
    assert.equal(downVoteCountAfterVotes - downVoteCount, 0);
  })

  // All registered users should be able to downvote a claim and the 
  // downvote count should increase per vote
  it("should only allow regitered users to upvote a claim", async () => {
    let instance = await ProofOfExistence.deployed();

    let claim = await instance.getClaim.call(Bob, claimIndex, { from: Bob });
    let upVoteCount = Number(claim.valueOf()[3]);
    let downVoteCount = Number(claim.valueOf()[4]);
  
    await instance.downVoteClaim(Bob, claimIndex, { from: Alice });
  
    let claimAfterVotes = await instance.getClaim.call(Bob, claimIndex, { from: Bob });
    let upVoteCountAfterVotes = Number(claimAfterVotes.valueOf()[3]);
    let downVoteCountAfterVotes = Number(claimAfterVotes.valueOf()[4]);

    assert.equal(upVoteCountAfterVotes - upVoteCount, 0);
    assert.equal(downVoteCountAfterVotes - downVoteCount, 1);
  })

  // Users should be able to change their vote anytime
  it("should only allow users to change up to down vote", async () => {
    let instance = await ProofOfExistence.deployed();

    let claim = await instance.getClaim.call(Bob, claimIndex, { from: Bob });
    let upVoteCount = Number(claim.valueOf()[3]);
    let downVoteCount = Number(claim.valueOf()[4]);
  
    // console.log(`voted before up:${upVoteCount} down:${downVoteCount}`);

    await instance.downVoteClaim(Bob, claimIndex, { from: Bob });
  
    let claimAfterVotes = await instance.getClaim.call(Bob, claimIndex, { from: Bob });
    let upVoteCountAfterVotes = Number(claimAfterVotes.valueOf()[3]);
    let downVoteCountAfterVotes = Number(claimAfterVotes.valueOf()[4]);

    // console.log(`voted before up:${upVoteCountAfterVotes} down:${downVoteCount}`);
    
    assert.equal(upVoteCount - upVoteCountAfterVotes, 1);
    assert.equal(downVoteCountAfterVotes - downVoteCount, 1);
  })

  // Users should be able to change their vote anytime
  it("should only allow users to change down to up vote", async () => {
    let instance = await ProofOfExistence.deployed();

    let claim = await instance.getClaim.call(Bob, claimIndex, { from: Bob });
    let upVoteCount = Number(claim.valueOf()[3]);
    let downVoteCount = Number(claim.valueOf()[4]);
  
    // console.log(`voted before up:${upVoteCount} down:${downVoteCount}`);

    await instance.upVoteClaim(Bob, claimIndex, { from: Alice });
  
    let claimAfterVotes = await instance.getClaim.call(Bob, claimIndex, { from: Bob });
    let upVoteCountAfterVotes = Number(claimAfterVotes.valueOf()[3]);
    let downVoteCountAfterVotes = Number(claimAfterVotes.valueOf()[4]);

    // console.log(`voted before up:${upVoteCountAfterVotes} down:${downVoteCount}`);
    
    assert.equal(upVoteCountAfterVotes - upVoteCount, 1);
    assert.equal(downVoteCount - downVoteCountAfterVotes, 1);
  })

  // Users can call the up / down vote multiple times, but it will only count the 
  // first vote
  it("should not allow users to double vote", async () => {
    let instance = await ProofOfExistence.deployed();

    let claim = await instance.getClaim.call(Bob, claimIndex, { from: Bob });
    let upVoteCount = Number(claim.valueOf()[3]);
    let downVoteCount = Number(claim.valueOf()[4]);
  
    // console.log(`voted before up:${upVoteCount} down:${downVoteCount}`);

    await instance.upVoteClaim(Bob, claimIndex, { from: Alice });
  
    let claimAfterVotes = await instance.getClaim.call(Bob, claimIndex, { from: Bob });
    let upVoteCountAfterVotes = Number(claimAfterVotes.valueOf()[3]);
    let downVoteCountAfterVotes = Number(claimAfterVotes.valueOf()[4]);

    // console.log(`voted before up:${upVoteCountAfterVotes} down:${downVoteCount}`);
    
    assert.equal(upVoteCountAfterVotes - upVoteCount, 0);
    assert.equal(downVoteCount - downVoteCountAfterVotes, 0);
  })

  
})
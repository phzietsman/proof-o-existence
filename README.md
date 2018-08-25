# proof-o-existence
[![Build Status](https://travis-ci.org/phzietsman/proof-o-existence.svg?branch=master)](https://travis-ci.org/phzietsman/proof-o-existence)

## Tooling Requirements
To replicate this environemnt:
* Nodejs v8.10.0 or higher
* Truffle v4.1.14 (core: 4.1.14)
* Solidity v0.4.24 (solc-js)

## Todos
1. Comment code
  ```
  /** @dev Returns a claim for a given index
    * @param _index The index for the claim to return
    * @return name xxx
    * @return description yyy
    * @return ipfs The zzz
    * @return blockNumber aaa
  */
  ```
2. 
2.


## Testing
Note, the tests are making use of the async await notation. Ensure your node eviroment is on the correct version, otherwise this will not work.


## Features
1. register a new address (Contract Only + UI)
1. update an address bio (Contract Only)
1. ~~Create a claim~~

grunt copy:abi

browserify js/factories/ipfs.factory.pre.js -o js/factories/ipfs.factory.js

@phzietsman@mastodon.social


Features:
Upload picture

Attest for someone

## Global Node packages
npm -g ls --depth 0
truffle-hdwallet-provider > npm install -g truffle-hdwallet-provider
browserify > npm install -g browserify

├── npm@6.3.0
├── truffle@4.1.14


https://ethereum.stackexchange.com/questions/11866/web3-how-do-i-get-past-events-of-mycontract-myevent



![execute](./README/signup.png?raw=true)
![execute](./README/proof_of_contract.png?raw=true)


[Design pattern](README/design_pattern_desicions.md)
[Security](README/avoiding_common_attacks.md)


truffle-secret.js

module.exports = {
  mnemonic: "",
  infura: ""
}
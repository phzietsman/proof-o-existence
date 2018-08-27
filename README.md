# proof-o-existence
[![Build Status](https://travis-ci.org/phzietsman/proof-o-existence.svg?branch=master)](https://travis-ci.org/phzietsman/proof-o-existence)

This application allows users to proof existence of some information by showing a time stamped picture. The timestamping is provided by the adding the blocknumber in which the transaction was included, this cannot be tampered with and is the ultimate proof. The application is deployed to the [Rinkeby Testnet](https://rinkeby.etherscan.io/address/0x566049b56b36281d08d8fa4519b83d701094ce99) and can be interface with through [github pages](https://phzietsman.github.io/proof-o-existence/ui).

In the application the you can create a **claim**. Claims can be viewed by anybody, but can only be **endorsed / up-voted** or **down-voted** by other registered users of the application. Claims (and user bios) gets uploaded to ipfs using the [infura](https://infura.io/) ipfs gateway, the ipfs hash (which is also the file's address) is then associated with an Ethereum address in the smartcontract.

**Links:**  
[Design Decisions](README/design_pattern_decisions.md)  
[Avoiding Common Attacks](README/avoiding_common_attacks.md)  
[Using the PoE app](README/how_to_use.md)  

## Tooling Requirements
To work on this project you will need the following:
* Nodejs v8.10.0 or higher (async/await used for testing)
* Truffle v4.1.14 (core: 4.1.14)
* Solidity v0.4.24 (solc-js)
* Ubuntu 18.04 (not a requirement, but it will make things easier)

## Project Layout
The project was created using `truffle init`. The UI is in the **ui/** directory.  The project has two *package.json* files, one in the project root and one in the **ui/** directory. The root node package.json has some of the node modules that would usually be installed globally (browserify, grunt-cli, ...) and tools to deploy the contract to public networks (like Rinkeby).

## Running the project
### Install Dependencies
All dependencies will be installed from the project root. To install the run the following from the project root:  
> `$ npm install`   

The **postinstall** hook is used to install the dependencies in the **ui/** directory as well. 

### UI
AngularJS was used for the UI and a bootstrap theme was used to create a responsive app. The project follows common practices and exploring the in detail how the UI work is beyond the scope of this assignment. **Important** to notice:
* If you change the smart contract signature (add / remove / change anything), you will have to run from the project root: `$npm run grunt copy:abi`. This will copy truffle build artifacts (*ProofOfExistence.json*) to a directory accessable by the the webservers
* Usually web dependencies (angularjs, jquery, ...) are not committed to source control, but since this is being served from Github, the dependencies required to serve the UI has been committed.
* The ipfs factory (*ui/js/factory/ipfs.factory.pre.js*) `requires` a node module (Buffer). If you modify this factory, run `$npm run browserify` from the root of the project to make it browser compatible.
* The UI does not make "listen" for smart-contract events due a [known issue](https://ethereum.stackexchange.com/questions/11866/web3-how-do-i-get-past-events-of-mycontract-myevent) with web3.

To serve UI, from the project root run:   
> `$ npm run serve`   

this will start a webserver on port 8086 and the UI will be available [here](http://127.0.0.1:8086). The serve command output should look something like this:

![http-server](./README/serve.png?raw=true)

Ensure you have MetaMask installed in your browser and you are either on a custom network or Rinkeby. If you change between networks in MetaMask, make sure to to refresh the web page.

### Testing Contract
Tests are located in the standard truffle test directory. Note, the tests are making use of the async await notation. Ensure your node eviroment is on the correct version, otherwise this will not work. Tests are also automatically ran with [TravisCI](https://travis-ci.org/phzietsman/proof-o-existence.svg?branch=master. To run the tests, execute the following command from  the project root:   
> `$ truffle test --network develop`    

This will run the tests against truffle's built in develop network. The output should look something like this:

![truffle-tests](./README/truffle-tests.png?raw=true)

### Deploy the Contract
Two truffle-configs have been setup to deploy (migrate) the contract to different networks:

```javascript
const HardwareWallet = require("truffle-hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*" // match any network
    },
    rinkeby: {
      provider: () => new HardwareWallet(require("./truffle-secrets").mnemonic, require("./truffle-secrets").infura),
      network_id: 4,
      gas: 4500000, // Gas limit used for deploys
      gasPrice: 25000000000
    }
  }
};
```
To deploy to a public network make sure to create a file (truffle-secret.js) in the root of the project and export two variables (mnemonic and infura). More on deploying to using infura [here](https://truffleframework.com/tutorials/using-infura-custom-provider).

To test the contract on you local, first start a development blockchain by running the following command:   
> `$ truffle develop`   

this will create a test network with a few pre-funded accounts:   

![truffle-develop](./README/truffle-develop.png?raw=true)

<!-- # The toys -->
<!-- ![metamask](./README/metamask-logo.png) ![metamask](./README/ethereum.png) ![metamask](./README/ipfs.png) -->

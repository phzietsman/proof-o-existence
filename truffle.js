// const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = "";
const infuraToken = "";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*" // match any network
    }
  },
  rinkeby: {
    provider: () => new require("truffle-hdwallet-provider")(mnemonic, `https://rinkeby.infura.io/v3/${infuraToken}`),
    network_id: 4,
    gas: 4500000, // Gas limit used for deploys
    gasPrice: 25000000000
  } 
};
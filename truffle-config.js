const secrets = require("./truffle-secrets");
const HardwareWallet = require("truffle-hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*" // match any network
    },
    rinkeby: {
      provider: () => new HardwareWallet(secrets.mnemonic, secrets.infura),
      network_id: 4,
      gas: 4500000, // Gas limit used for deploys
      gasPrice: 25000000000
    }
  }
};
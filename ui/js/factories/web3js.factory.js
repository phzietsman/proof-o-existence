angular.module('POEApp')
  .factory('web3jsFactory', web3jsFactory);

web3jsFactory.$inject = ['$rootScope', '$http', '$q'];

function web3jsFactory($rootScope, $http, $q) {

  /*
    Some of the web3 calls a sync, wrap the in promises that resolve
    immediately to make consuming the factory uniform.
  */


  var __web3 = {
    found: false,
    instance: null,
    version: null,
    contract: null
  };

  function InitializeWeb3js(web3, Web3) {

    __web3.version = web3.version.api;
    __web3.instance = new Web3(web3.currentProvider);
    __web3.found = true;

  }

  function GetCoinbase() {

    const coinbase = __web3.instance.eth.coinbase;

    const q = $q.defer();
    q.resolve(coinbase);
    return q.promise;
  }

  function GetBalance(coinbase) {

    const q = $q.defer();

    __web3.instance.eth.getBalance(coinbase, (err, response) => {

      if (err) {
        q.reject(err);
      }

      const balance = __web3.instance.fromWei(response.toNumber(), "ether");
      console.log(`Balance = ${balance} ether`);

      q.resolve(balance);

    });

    return q.promise;
  }

  function LoadContract(network) {
    
    const q = $q.defer();

    if(!network) {
      // default to develop network
      network = "4447";
    }

    $http.get('./js/ProofOfExistence.json')
    .then(response => {
      console.info(`ProofOfExistence Contract Address ${response.data.networks[network].address} for network ${network}`);

      const cont = __web3.instance.eth.contract(response.data.abi);
      __web3.contract = cont.at(response.data.networks[network].address);

      q.resolve();

    })
    .catch(err => {
      console.error(`LoadContract`, err);
      q.reject();
    });

    return q.promise;

  }

  function GetBio(coinbase) {

    const q = $q.defer();

    __web3.contract.getBio(coinbase, undefined, undefined, (err, data) => {

      if (err) {
        console.log('GetBio error', err.message);
        q.reject(err);
      }

      var mapped = {
        name: data[0],
        ipfs: data[1],
        index: Number(data[2].valueOf()),
      }

      q.resolve(mapped);
    });

    return q.promise;
  }

  function Register(name, ipfs) {

    const q = $q.defer();

    __web3.contract.registerAddress(name, ipfs, undefined, undefined, (err, data) => {

      if (err) {
        console.log('GetBio error', err.message);
        q.reject(err);
      }

      q.resolve(data);
    });

    return q.promise;
  }

  

  return {
    web3js: __web3,
    initializeWeb3js: InitializeWeb3js,
    getCoinbase: GetCoinbase,
    getBalance: GetBalance,
    loadContract: LoadContract,
    // Contract Methods
    getBio: GetBio,
    register: Register
  };
}
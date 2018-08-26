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
    network: 9999,
    instance: null,
    version: null,
    contract: null
  };

  function InitializeWeb3js(web3, Web3) {

    const q = $q.defer();

    __web3.version = web3.version.api;
    __web3.instance = new Web3(web3.currentProvider);
    __web3.found = true;

    web3.version.getNetwork((err, netId) => {

      if(err) {
        q.resolve(__web3);
        return;
      }

      switch (netId) {
        case "1":
          console.log('This is mainnet')
          break
        case "2":
          console.log('This is the deprecated Morden test network.')
          break
        case "3":
          console.log('This is the ropsten test network.')
          break
        case "4":
          console.log('This is the rinkeby test network.')
          break
        default:
          console.log(`Develpment network: ${netId}`)
      }
      __web3.network = netId;
      q.resolve(__web3);

    });
    
    return q.promise;

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

  function LoadContract() {
    
    const q = $q.defer();

    
    
    $http.get('./js/ProofOfExistence.json')
    .then(response => {
      
      const network = __web3.network ? __web3.network :  "4447";


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
        console.error('GetBio error', err.message);
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

  // =========================================
  // Claims Methods
  // =========================================

  function CreateClaim(name, ipfs) {

    const q = $q.defer();

    __web3.contract.createClaim(name, ipfs, undefined, undefined, (err, data) => {

      if (err) {
        console.log('CreateClaim error', err.message);
        q.reject(err);
      }

      q.resolve(data);
    });

    return q.promise;
  }

  function GetAllClaimsForAddress(coinbase) {
    const q = $q.defer();

    GetClaimsCount(coinbase)
    .then( (count) => {

      var promises = [];
      for(var i =0; i < count; i++) {
        promises.push(GetClaim(coinbase, i));
      }

      return $q.all(promises);
      
    })
    .then( (claims) => {
      q.resolve(claims);
    });

    return q.promise;
  }

  function GetClaimsCount(coinbase) {

    const q = $q.defer();

    __web3.contract.getClaimCount(coinbase, undefined, undefined, (err, data) => {

      if (err) {
        console.error('GetClaimsCount error', err.message);
        q.resolve(0);
      }

      q.resolve(Number(data.valueOf()));
    });

    return q.promise;
  }

  function GetClaim(coinbase, index) {

    const q = $q.defer();

    __web3.contract.getClaim(coinbase, index, undefined, undefined, (err, data) => {

      if (err) {
        console.log('GetClaim error', err.message);
        q.reject(err);
      }

      q.resolve({
        owner: coinbase,
        index: index,

        name:data[0],
        ipfs:data[1],
        block: data[2].valueOf(),
        up:data[3].valueOf(),
        down:data[4].valueOf(),
        
        type: "claim",
        pic:"",
        description:""
      });

    });

    return q.promise;
  }

  // =========================================
  // Get Claims Methods
  // =========================================

  function GetAllRegisteredAddresses() {
    const q = $q.defer();

    GetRegisteredAddressCount()
    .then( (count) => {

      var promises = [];
      for(var i = 0; i < count; i++) {
        promises.push(GetRegisteredAddress(i));
      }

      return $q.all(promises);
      
    })
    .then( (claims) => {
      q.resolve(claims);
    });

    return q.promise;
  }

  function GetRegisteredAddressCount() {

    const q = $q.defer();

    __web3.contract.getRegisteredAddressCount(undefined, undefined, (err, data) => {

      if (err) {
        console.log('GetRegisteredAddressCount error', err.message);
        q.resolve(0);
      }

      q.resolve(data.valueOf());

     });

    return q.promise;
  }

  function GetRegisteredAddress(index) {

    const q = $q.defer();

    __web3.contract.getRegisteredAddress(index, undefined, undefined, (err, data) => {

      if (err) {
        console.log('GetClaim error', err.message);
        q.reject(err);
      }

      q.resolve(data);

    });

    return q.promise;
  }
  
  // =========================================
  // Register
  // =========================================
  
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

  
  function Upvote(address, index) {

    const q = $q.defer();

    __web3.contract.upVoteClaim(address, index, undefined, undefined, (err, data) => {

      if (err) {
        console.log('Upvote error', err.message);
        q.reject(err);
      }

      q.resolve(data);
    });

    return q.promise;
  }

  function Downvote(address, index) {

    const q = $q.defer();

    __web3.contract.downVoteClaim(address, index, undefined, undefined, (err, data) => {

      if (err) {
        console.log('Downvote error', err.message);
        q.reject(err);
      }

      q.resolve(data);
    });

    return q.promise;
  }



  return {
    web3js: __web3,
    initializeWeb3js: InitializeWeb3js,
    // web3 functions
    getCoinbase: GetCoinbase,
    getBalance: GetBalance,
    loadContract: LoadContract,
    // Contract Methods
    getBio: GetBio,
    register: Register,
    createClaim:CreateClaim,
    getAllClaimsForAddress:GetAllClaimsForAddress,
    getAllRegisteredAddresses: GetAllRegisteredAddresses,
    upvote: Upvote,
    downvote: Downvote
  };
}
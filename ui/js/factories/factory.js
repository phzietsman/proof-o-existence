angular.module('materialAdmin')
  .factory('web3jsFactory', web3jsFactory)
  .factory('usersFactory', usersFactory)
  .factory('ipfsFactory', ipfsFactory);

web3jsFactory.$inject = ['$rootScope', '$http', '$q'];
ipfsFactory.$inject = ['$rootScope', '$http', '$q'];
usersFactory.$inject = ['$rootScope', '$http', '$q', 'web3jsFactory'];

function web3jsFactory($rootScope, $http, $q) {

  /*
    Some of the web3 calls a sync, wrap the in promises that resolve
    immediately to make consuming the factory uniform.
  */


  var __web3 = {
    found: false,
    instance: null,
    version: null
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

  function LoadContract() {
    
  }

  return {
    web3js: __web3,
    initializeWeb3js: InitializeWeb3js,
    getCoinbase: GetCoinbase,
    getBalance: GetBalance,
    loadContract: LoadContract
  };
}


function ipfsFactory($rootScope, $http, $q) { }

function usersFactory($rootScope, $http, $q, web3jsFactory) {

  var me = {
    authed: false,
    coinbase: null,
    balance:0
  }

  var users = [];

  function Login() {
    web3jsFactory.GetCoinbase()
    .then( (coinbase) => {
      me.coinbase = coinbase;
      me.authed = true;

      return me;
    })
    .catch( (e) => {
      console.error(e);
    });
  }

  return {
    me: me,
    users: users,
    login: Login
  }
}
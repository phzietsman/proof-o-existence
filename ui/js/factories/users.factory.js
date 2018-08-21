angular.module('POEApp')
  .factory('usersFactory', usersFactory);

usersFactory.$inject = ['$rootScope', '$state', '$http', '$q', 'web3jsFactory'];

function usersFactory($rootScope, $state, $http, $q, web3jsFactory) {

  var me = {
    authed: false,
    coinbase: null,
    ipfs: null
  }

  function Login() {

    const q = $q.defer();

    web3jsFactory.getBio(me.coinbase)
    .then( (bio) => {
      console.info("getBio", bio);
      if(bio.index === 0) {
        q.reject("Login:NotRegistered");
      } else {
        q.resolve();
        me.authed = true;
        me.ipfs = bio.ipfs;
        $state.go("profile.profile-about")
      }

    })
    .catch( (e) => {
      console.error("Login:Error", e);
      q.reject("Login:Error");

    });

    return q.promise;

  }

  function SetCoinbase() {
    return web3jsFactory.getCoinbase()
    .then( (coinbase) => {
      me.coinbase = coinbase;

      return me;
    })
    .catch( (e) => {
      console.error(e);
    });
  }

  return {
    me: me,
    setCoinbase: SetCoinbase,
    login: Login
  }
}
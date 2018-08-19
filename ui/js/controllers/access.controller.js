angular.module('POEApp')
  .controller('accessController', accessController)
  .directive("selectNgFiles", selectNgFiles);

accessController.$inject = ['$state', '$timeout', 'growlService', 'usersFactory', 'ipfsFactory', 'web3jsFactory'];

function accessController($state, $timeout, growlService, usersFactory, ipfsFactory, web3jsFactory) {

  var accessCtrl = this;

  accessCtrl.coinbase = null;
  accessCtrl.name = null;
  accessCtrl.twitter = null;
  accessCtrl.mastodon = null;
  accessCtrl.image = [];

  accessCtrl.ipfs = null;
  accessCtrl.hash = null;

  accessCtrl.busy = false;

  accessCtrl.signup = __signup;
  accessCtrl.login = __login;

  function __signup() {

    accessCtrl.busy = true;
    const userModel = ipfsFactory.createUserModel(accessCtrl.name, accessCtrl.twitter, accessCtrl.mastodon, accessCtrl.image[0]);

    if (accessCtrl.ipfs) {

      web3jsFactory.register(accessCtrl.name, accessCtrl.ipfs)
        .then((data) => {
          accessCtrl.hash = data;
          accessCtrl.busy = false;
        })
        .catch(() => {
          accessCtrl.busy = false;
          growlService.growl('Oops something went wrong! :(', 'inverse');
        });
    } else {

      ipfsFactory.addFile(accessCtrl.coinbase, JSON.stringify(userModel))
        .then((path) => {
          accessCtrl.ipfs = path;
          return web3jsFactory.register(accessCtrl.name, accessCtrl.ipfs);
        })
        .then((data) => {
          accessCtrl.hash = data;
          accessCtrl.busy = false;
        })
        .catch(() => {
          accessCtrl.busy = false;
          growlService.growl('Oops something went wrong! :(', 'inverse');
        });
    }
  }

  function __login() {
    usersFactory.login()
      .then(() => { 
        growlService.growl('Whoop! :)', 'inverse') 
      })
      .catch((e) => {

        if (e === "Login:NotRegistered") {
          growlService.growl('Sure you are registered? :|', 'inverse');
        }

        if (e === "Login:Error") {
          growlService.growl('Oops something went wrong! :(', 'inverse');
        }

      });
  }



  $timeout(init, 100);
  function init() {
    usersFactory.setCoinbase()
      .then((me) => {
        if (me.coinbase == null) {
          console.info("Coinbase retry");
          $timeout(init, 100);
        } else {
          console.info("Coinbase found:", me);
          accessCtrl.coinbase = me.coinbase;
        }

      });
  }

}

function selectNgFiles() {
  return {
    require: "ngModel",
    link: function postLink(scope, elem, attrs, ngModel) {
      elem.on("change", function (e) {
        var files = elem[0].files;
        ngModel.$setViewValue(files);
      })
    }
  }
}

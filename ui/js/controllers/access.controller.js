angular.module('POEApp')
.controller('accessController', accessController) 

accessController.$inject = ['$timeout', 'growlService', 'usersFactory'];

function accessController ($timeout, growlService, usersFactory) {

  var accessCtrl = this;
 
  accessCtrl.coinbase = null;

  accessCtrl.test = __test;
  accessCtrl.login = __login;




  function __test() {
    console.log("Bindedn");
  }

  function __login() {
    usersFactory.login()
    .then( ()  => { growlService.growl('Whoop! :)', 'inverse') })
    .catch( (e) => { 
      
      if(e === "Login:NotRegistered") {
        growlService.growl('Sure you are registered? :|', 'inverse'); 
      }

      if(e === "Login:Error") {
        growlService.growl('Oops something went wrong! :(', 'inverse');
      }
      
    });
  }
   
  
  
  $timeout(init, 100);
  function init() {
    usersFactory.setCoinbase()
    .then((me) => {
      if(me.coinbase == null) {
        console.info("Coinbase retry");
        $timeout(init, 100);
      } else {
        console.info("Coinbase found:", me);
        accessCtrl.coinbase = me.coinbase;
      }

    });
  }

}
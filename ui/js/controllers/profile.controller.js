angular.module('POEApp')
  .controller('profileController', profileController)
  .controller('modalInstanceController', modalInstanceController);

profileController.$inject = ['$uibModal', '$timeout', 'growlService', 'usersFactory', 'ipfsFactory', 'web3jsFactory'];
modalInstanceController.$inject = ['$uibModalInstance', 'coinbase']

function profileController($uibModal, $timeout, growlService, usersFactory, ipfsFactory, web3jsFactory) {

  var profileCtrl = this;

  profileCtrl.contractAddress = web3jsFactory.contract;
  profileCtrl.editInfo = 0;
  profileCtrl.me = {
    pic: "",
    name: "",
    twitter: "",
    mastodon: "",
    coinbase: usersFactory.me.coinbase,
    bioIpfs: usersFactory.me.ipfs,
  };
  
  profileCtrl.myClaims = [];
  profileCtrl.allClaims = [];

  profileCtrl.addClaim = __addClaim;
  profileCtrl.refresh = __refresh;
  profileCtrl.search = __search;

  function __addClaim() {
    var modalInstance = $uibModal.open({
      animation: false,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'template/claimModal.html',
      controller: 'modalInstanceController',
      controllerAs: 'modalInstanceCtrl',
      size: '',
      resolve: {
        coinbase: function () {
          return 'NA';
        }
      }
    });

    modalInstance.result
    .then(function (selectedItem) {
      $ctrl.selected = selectedItem;
    })
    .catch(function () {
      $log.info('Modal dismissed at: ' + new Date());
    });

  }

  function __refresh() { }
  function __search(term) { }


  
  $timeout(init, 100);
  function init() {
    // Get bio
    ipfsFactory.getFile(usersFactory.me.ipfs)
    .then( (bio) => {
      // console.log(bio);
      profileCtrl.me.pic = bio.image.result;
      profileCtrl.me.name = bio.name;
      profileCtrl.me.twitter = bio.social.twitter;
      profileCtrl.me.mastodon = bio.social.mastodon;
    });
  }




}


function modalInstanceController($uibModalInstance, coinbase) {
  var modalInstanceCtrl = this;
  modalInstanceCtrl.coinbase = coinbase;

  modalInstanceCtrl.ok = function () {
    $uibModalInstance.close(modalInstanceCtrl.coinbase);
  };

  modalInstanceCtrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}
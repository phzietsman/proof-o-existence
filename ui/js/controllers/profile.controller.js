angular.module('POEApp')
  .controller('profileController', profileController)
  .controller('modalInstanceController', modalInstanceController);

profileController.$inject = ['$rootScope', '$state', '$uibModal', '$timeout', 'growlService', 'usersFactory', 'ipfsFactory', 'web3jsFactory'];
modalInstanceController.$inject = ['$uibModalInstance', 'coinbase']

function profileController($rootScope, $state, $uibModal, $timeout, growlService, usersFactory, ipfsFactory, web3jsFactory) {

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

  profileCtrl.myClaimFilter = "";
  profileCtrl.allClaimFilter = "";
  profileCtrl.searchValue = "";

  profileCtrl.addClaim = __addClaim;
  profileCtrl.refresh = __refresh;
  profileCtrl.search = __search;
  profileCtrl.openSearch = __openSearch;
  profileCtrl.closeSearch = __closeSearch;

  profileCtrl.upvote = __upvote;
  profileCtrl.downvote = __downvote;


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
      .then(function (claim) {

        $rootScope.$emit('LOADING:TRUE');

        const claimModel = ipfsFactory.createClaimModel(claim.name, claim.description, claim.image);
        growlService.growl('syncing to ipfs :o', 'info');
        ipfsFactory.addFile(profileCtrl.me.coinbase, JSON.stringify(claimModel))
          .then((path) => {
            return web3jsFactory.createClaim(claim.name, path);
          })
          .then((data) => {
            $rootScope.$emit('LOADING:FALSE');
            growlService.growl(`Whoop, transaction submitted (${data.hash})`, 'success');
          })
          .catch(() => {
            $rootScope.$emit('LOADING:FALSE');
            growlService.growl('Oops something went wrong! :(', 'warning');
          });

      })
      .catch(function () {
        $log.info('Modal dismissed at: ' + new Date());
      });

  }

  function __search(term) { 

    switch ($state.current.name) {
      case "profile.profile-claims":
        profileCtrl.myClaimFilter = term;
        profileCtrl.allClaimFilter = "";
        break;
      case "profile.profile-all-claims":
        profileCtrl.myClaimFilter = "";
        profileCtrl.allClaimFilter = term;
        break;
    }

  }

  function __refresh() {
    switch ($state.current.name) {
      case "profile.profile-claims":
        $rootScope.$emit('LOADING:TRUE');
        __getAllMyClaims();
        break;
      case "profile.profile-all-claims":
        $rootScope.$emit('LOADING:TRUE');
        __getAllClaims();
        break;
      case "profile.profile-about":
        $rootScope.$emit('LOADING:TRUE');  
        __loadBio();
        break;
    }

  }

  function __openSearch() {
    angular.element('#header').addClass('search-toggled');
    angular.element('#top-search-wrap').find('input').focus();
  }

  function __closeSearch() {
    angular.element('#header').removeClass('search-toggled');
    profileCtrl.myClaimFilter = "";
    profileCtrl.allClaimFilter = "";
    profileCtrl.searchValue = "";
  }

  function __loadBio() {
    // Get bio
    ipfsFactory.getFile(usersFactory.me.ipfs)
      .then((bio) => {
        // console.log(bio);
        profileCtrl.me.pic = bio.image.result;
        profileCtrl.me.name = bio.name;
        profileCtrl.me.twitter = bio.social.twitter;
        profileCtrl.me.mastodon = bio.social.mastodon;

        $rootScope.$emit('LOADING:FALSE');
      });
  }

  function __getAllMyClaims() {
    web3jsFactory.getAllClaimsForAddress(usersFactory.me.coinbase)
      .then((claims) => {
        profileCtrl.myClaims = claims;
        profileCtrl.myClaims.forEach((claim) => {
          ipfsFactory.getFile(claim.ipfs)
            .then((data) => {
              claim.pic = data.image.result;
              claim.description = data.description;
              $rootScope.$emit('LOADING:FALSE');
            });
        });
      });
  }

  function __getAllClaims() {

    profileCtrl.allClaims = [];

    web3jsFactory.getAllRegisteredAddresses()
      .then((addresses) => {
        addresses.forEach((address) => {

          web3jsFactory.getBio(address)
            .then((bio) => {

              web3jsFactory.getAllClaimsForAddress(address)
                .then((claims) => {
                  
                  claims.forEach((claim) => {
                    ipfsFactory.getFile(claim.ipfs)
                      .then((data) => {
                        claim.pic = data.image.result;
                        claim.description = data.description;
                        claim.ownerName = bio.name;
                        claim.ownerIpfs = bio.ipfs;

                        profileCtrl.allClaims.push(claim);
                        // More will load, but the first is available;
                        $rootScope.$emit('LOADING:FALSE');

                      });
                  });

                });

            })
        });
      });
  }

  function __upvote(claim) {
    
    $rootScope.$emit('LOADING:TRUE');

    web3jsFactory.upvote(claim.owner, claim.index)
    .then(() => {
      growlService.growl(`Whoop, transaction submitted`, 'success');
      $rootScope.$emit('LOADING:FALSE');
    })
    .catch(()=>{
      growlService.growl('Oops something went wrong! :(', 'warning');
      $rootScope.$emit('LOADING:FALSE');
    });
  }

  function __downvote(claim) {
    $rootScope.$emit('LOADING:TRUE');

    web3jsFactory.downvote(claim.owner, claim.index)
    .then(() => {
      growlService.growl(`Whoop, transaction submitted`, 'success');
      $rootScope.$emit('LOADING:FALSE');
    })
    .catch(()=>{
      growlService.growl('Oops something went wrong! :(', 'warning');
      $rootScope.$emit('LOADING:FALSE');
    });

  }

  $timeout(init, 100);
  function init() {

    __loadBio();
    __getAllMyClaims();
    __getAllClaims();

  }

}


function modalInstanceController($uibModalInstance, coinbase) {
  var modalInstanceCtrl = this;
  modalInstanceCtrl.coinbase = coinbase;
  modalInstanceCtrl.name = null;
  modalInstanceCtrl.description = null;
  modalInstanceCtrl.image = [];

  modalInstanceCtrl.ok = function () {
    $uibModalInstance.close({
      name: modalInstanceCtrl.name,
      description: modalInstanceCtrl.description,
      image: modalInstanceCtrl.image[0]
    });
  };

  modalInstanceCtrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}
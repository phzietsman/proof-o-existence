angular.module('POEApp')
  .controller('profileController', profileController)
  .controller('modalInstanceController', modalInstanceController);

profileController.$inject = ['$uibModal', 'growlService', 'usersFactory', 'ipfsFactory', 'web3jsFactory'];
modalInstanceController.$inject = ['$uibModalInstance', 'coinbase']

function profileController($uibModal, growlService, usersFactory, ipfsFactory, web3jsFactory) {

  var profileCtrl = this;

  profileCtrl.addClaim = __addClaim;

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
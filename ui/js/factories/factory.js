angular.module('materialAdmin')
.factory('web3jsFactory', web3jsFactory)
.factory('ipfsFactory', ipfsFactory);

function web3jsFactory() {

  var foundWeb3js = false;

  return {
    foundWeb3js: foundWeb3js
  };
}
function ipfsFactory() {}
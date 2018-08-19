angular.module('POEApp')
  .factory('ipfsFactory', ipfsFactory);

ipfsFactory.$inject = ['$rootScope', '$window','$http', '$q'];

function ipfsFactory($rootScope, $window,$http, $q) { 

  const __ipfs = $window.IpfsApi({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });



  function GetFile (file) {
    __ipfs.files.get('/ipfs/Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a')
    .then( (files) => {
      files.forEach((file) => {
        console.log(file.path)
        console.log(file.content.toString('utf8'))
      })
    })
    .catch( (err) => {
      console.error("IPFS GET ERROR", err);
    });
  }

  function CreateUserModel(name, twitter, mastodon, imagebase64, imageformat) {
    const user = {
      name: name,
      social: {
        twitter: twitter,
        mastodon: mastodon
      },
      image: {
        base64:imagebase64,
        format:imageformat
      }
    };

    return user;
  }

  return {

    createUserModel:CreateUserModel,

    getFile: GetFile
  };

}
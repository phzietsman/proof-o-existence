var Buffer = require('buffer/').Buffer ;

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

  function CreateUserModel(name, twitter, mastodon, image) {
    const user = {
      name: name,
      social: {
        twitter: twitter,
        mastodon: mastodon
      },
      image: image
    };

    return user;
  }

  function AddFile(dir, content) {

    var q = $q.defer();

    __ipfs.files.add(Buffer.from(content))
    .then(files => {
      q.resolve(files[0].path);
    })
    .catch(err=>{

      console.error("AddFile", err);
      q.reject();
    });

    return q.promise;
  }  

  return {
    createUserModel:CreateUserModel,
    // IPFS methods
    addFile:AddFile,  
    getFile: GetFile
  };

}
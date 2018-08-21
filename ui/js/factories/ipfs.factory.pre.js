var Buffer = require('buffer/').Buffer ;

angular.module('POEApp')
  .factory('ipfsFactory', ipfsFactory);

ipfsFactory.$inject = ['$rootScope', '$window','$http', '$q'];

function ipfsFactory($rootScope, $window,$http, $q) { 

  const __ipfs = $window.IpfsApi({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

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
  
  function CreateClaimModel(name, description, image) {
    const claim = {
      name: name,
      description: description,
      image: image
    };

    return claim;
  }

  function GetFile (file) {
    
    var q = $q.defer();
    
    __ipfs.files.get(`/ipfs/${file}`)
    .then( (files) => {
      files.forEach((file) => {
        q.resolve(JSON.parse(file.content.toString('utf8')));
      })
    })
    .catch( (err) => {
      console.error("IPFS GET ERROR", err);
      q.reject();
    });

    return q.promise;
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
    createClaimModel:CreateClaimModel,
    // IPFS methods
    addFile:AddFile,  
    getFile: GetFile
  };

}
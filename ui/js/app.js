angular.module('POEApp', [
    'ngAnimate',
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'oc.lazyLoad',
    'nouislider',
    'ngTable'
]);

angular.module('POEApp').run([
    '$window',
    '$rootScope',
    '$state',
    '$window',
    'growlService',
    'web3jsFactory',
    'usersFactory',
    function (
        $window,
        $rootScope,
        $state,
        $window,
        growlService,
        web3jsFactory,
        usersFactory
    ) {

        if($window.web3) {
            console.info("Web3js found");
            web3jsFactory.initializeWeb3js($window.web3, $window.Web3)
            .then( (result) => {
                console.log("web3", result);
                return web3jsFactory.loadContract();
            })            
            .then(()=>{ })
            .catch(()=>{ growlService.growl(`Could not load Contract. Ensure Metamask is set to Rinkeby.`, 'danger'); })
        } else {
            $state.go('web3jsMissing');
        }

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            
            // Cannot route to the missing page if web3js is found
            if (toState.name == 'web3jsMissing' && web3jsFactory.web3js.found) {
                event.preventDefault();
            }
            
            // Cannot route to anywhere else if web3 is not found
            else if(toState.name != 'web3jsMissing' && !web3jsFactory.web3js.found) {
                $state.go('web3jsMissing');
                event.preventDefault();
            }      

            // Block any unautharized access to secure views
            else if (toState.authed && !usersFactory.me.authed) {
                $state.go('signup');
                event.preventDefault();
            }

        });

        // $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) { });
        // $rootScope.$on('origin:eventName', function (event, newDocs) {  });
    }
]);

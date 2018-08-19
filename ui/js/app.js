angular.module('materialAdmin', [
    'ngAnimate',
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'oc.lazyLoad',
    'nouislider',
    'ngTable'
]);

angular.module('materialAdmin').run([
    '$window',
    '$rootScope',
    '$state',
    '$window',
    'web3jsFactory',
    function (
        $window,
        $rootScope,
        $state,
        $window,
        web3jsFactory
    ) {

        if($window.web3) {
            console.log("Found web3")
        }

        // $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        //     $rootScope.loading = true;

        //     // if we are logged in then we can't get back to welcome
        //     if (toState.name == 'authLogin' && authService.authentication.isAuth) {
        //         event.preventDefault();
        //     }

        //     // Block any unautharized access to secure views
        //     if (toState.requireAuth && !authService.authentication.isAuth) {
        //         $rootScope.kbFullUrl = location.href;

        //         // User isn't authenticated
        //         if (authService.previousLogin.email !== null) {
        //             $state.go('authLogin');
        //         } else {
        //             $state.go('authNewAccount');
        //         }
        //         event.preventDefault();
        //         return;
        //     }

        //     // App has initialized yet for this user. Do so now.
        //     if (authService.authentication.isAuth && $rootScope.appInitDone !== true && toState.name !== 'startup' && $state.current.name !== 'startup') {
        //         var parameters = {
        //             toState: toState,
        //             toParams: toParams
        //         };
        //         $state.go('startup', parameters);
        //         event.preventDefault();
        //         return;
        //     }
        // });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.loading = false;
            if (typeof analytics === "undefined") {
                
            }
        });

        $rootScope.$on('dataFactory:newDocuments', function (event, newDocs) {
            RegisterDataFactory.processNewDocuments(newDocs);
        });
    }
]);

angular.module('POEApp')
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/signup");


        $stateProvider

            .state('signup', {
                url: '/signup',
                templateUrl: 'views/__signup.html',
                authed: false,
                controller : 'accessController as accessCtrl'
            })

            .state('web3jsMissing', {
                url: '/web3jsMissing',
                templateUrl: 'views/__web3js.html',
                authed: false
            })

      
            .state('profile', {
                authed: true,
                url: '/profile',
                templateUrl: 'views/__profile.html',
                controller: 'profileController as profileCtrl'                
            })

            .state('profile.profile-about', {
                authed: true,
                url: '/about',
                templateUrl: 'views/__profile-about.html'
            })

            .state('profile.profile-claims', {
                authed: true,
                url: '/claims',
                templateUrl: 'views/__profile-claims.html'
            })

            .state('profile.profile-all-claims', {
                authed: true,
                url: '/all-claims',
                templateUrl: 'views/__profile-all-claims.html',

            });
    });

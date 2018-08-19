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
                templateUrl: 'views/__profile.html'
            })

            .state('profile.profile-about', {
                authed: true,
                url: '/about',
                templateUrl: 'views/__profile-about.html'
            })

            .state('profile.profile-timeline', {
                authed: true,
                url: '/timeline',
                templateUrl: 'views/__profile-timeline.html',
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/lightgallery/light-gallery/js/lightGallery.min.js'
                                ]
                            }
                        ])
                    }
                }
            })

            .state('profile.profile-connections', {
                authed: true,
                url: '/connections',
                templateUrl: 'views/__profile-connections.html'
            });
    });

angular.module('materialAdmin')
.config(function ($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise("/signup");


        $stateProvider
        
            .state ('signup', {
                url: '/signup',
                templateUrl: 'views/__signup.html',
                requiresAuth: false
            })

            .state ('web3jsMissing', {
                url: '/web3jsMissing',
                templateUrl: 'views/__web3js.html',
                requiresAuth: false
            })
        
            
            //------------------------------
            // PAGES
            //------------------------------        
            .state ('profile', {
                requiresAuth: true,
                url: '/profile',
                templateUrl: 'views/__profile.html'
            })

            .state ('profile.profile-about', {
                requiresAuth: true,
                url: '/about',
                templateUrl: 'views/__profile-about.html'
            })
        
            .state ('profile.profile-timeline', {
                requiresAuth: true,
                url: '/timeline',
                templateUrl: 'views/__profile-timeline.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
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
        
            .state ('profile.profile-connections', {
                requiresAuth: true,
                url: '/connections',
                templateUrl: 'views/__profile-connections.html'
            });
    });

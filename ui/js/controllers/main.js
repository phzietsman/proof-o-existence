angular.module('POEApp')
    .controller('materialadminCtrl', function ($rootScope, $state, growlService) {
        //Welcome Message
        growlService.growl('Already a user? Login ^^^', 'inverse')


        // Detact Mobile Browser
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            angular.element('html').addClass('ismobile');
        }

        // By default template has a boxed layout
        this.layoutType = localStorage.getItem('ma-layout-status');

        // For Mainmenu Active Class
        this.$state = $state;

        //Close sidebar on click
        this.sidebarStat = function (event) {
            if (!angular.element(event.target).parent().hasClass('active')) {
                this.sidebarToggle.left = false;
            }
        }

        this.shortenIpfs = function(ipfsString) {

            ipfsString = ipfsString.substring ? ipfsString : "";

            return `${ipfsString.substring(0, 14)}...`;
        }

        // Skin Switch
        // 'lightblue' 'bluegray' 'cyan' 'teal' 'green' 'orange' 'blue' 'purple'
        this.currentSkin = 'bluegray';

        $rootScope.$on('LOADING:TRUE', () => { this.loading = true; })
        $rootScope.$on('LOADING:FALSE', () => { this.loading = false; })

        this.loading = false;

    });
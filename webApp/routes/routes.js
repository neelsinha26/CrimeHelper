(function(){
    'use strict';

    angular.module("crimeHelper.routes",[
        'ui.router',
        'api.service',
        'crimeHelper.homeController',
        'crimeHelper.unsafeAreaController',
        'crimeHelper.unsafeAreaByGenderController',
        'crimeHelper.crimeReportedController',
        'crimeHelper.areaByCatController',
        'crimeHelper.countQueryController',
        'crimeHelper.percentageQueryController',
        'crimeHelper.weaponQueryController'



    ])
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){
            $locationProvider.hashPrefix('');
            $urlRouterProvider.when('', "/");

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: "User.html",
                    controller: "HomeController",
                    controllerAs: "homeCtrl"
                })
                .state('unsafeAreas',{
                    url: '/unsafeAreas',
                    templateUrl: "unsafeArea.html",
                    controller: "unsafeAreaController",
                    controllerAs: "unsafeAreaCtrl"
                })
                .state('areaByCat', {
                    url: '/areaByCat',
                    templateUrl: "query1.html",
                    controller: "AreaByCatController",
                    controllerAs: "areaByCatCtrl"
                })
                .state('unsafeAreaByGender',{
                    url:'/unsafeAreaByGender',
                    templateUrl: "unsafeAreabyGender.html",
                    controller: "unsafeAreaByGenderController",
                    controllerAs: "unsafeAreaByGenderCtrl"

                })
                .state('crimeReported',{
                    url:'/crimeReported',
                    templateUrl: "crimeReported.html",
                    controller: "crimeReportedController",
                    controllerAs: "crimeReportedCtrl"

                })
                .state('countQuery',{
                    url:'/countQuery',
                    templateUrl: "countQuery.html",
                    controller: "countQueryController",
                    controllerAs: "countQueryCtrl"

                })
                .state('percentageQuery',{
                    url:'/percentageQuery',
                    templateUrl: "percentage.html",
                    controller: "percentageQueryController",
                    controllerAs: "percentageQueryCtrl"

                })
                .state('weaponQuery',{
                    url:'/weaponQuery',
                    templateUrl: "weaponQuery.html",
                    controller: "weaponQueryController",
                    controllerAs: "weaponQueryCtrl"

                })
        }]);
})();
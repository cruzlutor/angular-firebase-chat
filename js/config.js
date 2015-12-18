/* jslint node: true */
'use strict';

module.exports = function($stateProvider, $locationProvider, $urlRouterProvider){
    
    $stateProvider

        .state('home', {
            url: '/',
            template: '<home></home>'
        });

    $urlRouterProvider.otherwise('/');
};
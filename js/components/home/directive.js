/* jslint node:true */
'use strict';

var angular = require('angular');

function home() {

    var controller = function($scope) {

        $scope.open = function(){
            $scope.$broadcast('open');
        }
    };

    var link = function(){};

    var template =  'views/home.html';

    return {
        // controllerAs : 'vm',
        scope: {},
        controller: controller,
        link: link,
        templateUrl: template
    };
}

var ngModule = require('./index');
ngModule.directive('home', [home]);
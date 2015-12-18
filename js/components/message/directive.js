/* jslint node:true */
'use strict';

var angular = require('angular');

function message() {

    var controller = function($scope) {

        angular.extend(this, {
            me: $scope.me,
            user: $scope.user,
            text: $scope.text,
            time: $scope.time,
        });
    };

    var link = function(){}

    var template =  'views/message.html';

    return {
        scope: {
            me: '@',
            user: '@',
            text: '@',
            time: '@',
        },
        transclude: true,
        controllerAs : 'vm',
        controller: controller,
        link: link,
        templateUrl: template
    };
}

var ngModule = require('./index');
ngModule.directive('message', [message]);
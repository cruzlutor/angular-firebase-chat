/* jslint node: true */
'use strict';


var angular = require('angular');

require('angular-resource');
require('angular-route');
require('angular-sanitize');
require('angular-animate');
require('angular-ui-router');

require('angular-froala');
require('./../libs/angular-froala/froala-sanitize');

require('./components/home');
require('./components/chat');
require('./components/message');
require('./components/file-model');

angular.element(document).ready(function() {

    var requires = [
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngAnimate',

        // three party
        'ui.router',
        'froala',
        'firebase',
        'file-model',

        // components
        'app.home',
        'app.chat',
        'app.message',
    ];

    // init app
    angular.module('app', requires);

    // load config
    angular.module('app').config(require('./config'));

    // load run
    angular.module('app').run(require('./run'));

    // manual bootstraping
    angular.bootstrap(document, ['app']);

});
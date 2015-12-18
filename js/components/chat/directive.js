/* jslint node:true */
'use strict';

var angular = require('angular');
var moment = require('moment');

function chat() {

    var controller = function($scope, $firebaseArray) {
        var ref = new Firebase("https://crackling-heat-3556.firebaseio.com/messages");
        var unwatch;

        $scope.users = {
            1: 'Richard Hendricks',
            2: 'Erlich Bachmann',
            3: 'Bertram Gilfoyle',
            4: 'Carla Walton',
        }

        $scope.messages = [];
        $scope.visible = false;
        $scope.user;
        $scope.receiver;
        
        this.init = function(){            
            $scope.froalaOptions = {
                toolbarBottom: true,
                toolbarButtons: ['bold', 'italic', 'underline', 'color']
            }
        }

        $scope.sendMessage = function(){
            if($scope.file){
                $scope.collection.$add({
                    user: $scope.user,
                    receiver: $scope.receiver,
                    text: '<i class="fa fa-file-text-o"></i> Archivo adjunto: ' + $scope.file.name,
                    time: moment().format('YYYY-MM-DD hh:mm'),
                    file: true
                }); 
            }

            if($scope.text){
                $scope.collection.$add({
                    user: $scope.user,
                    receiver: $scope.receiver,
                    text: $scope.text,
                    time: moment().format('YYYY-MM-DD hh:mm'),
                    file: ($scope.file) ? $scope.file.name : null
                });
            }
            $scope.removeFile();
        }

        $scope.removeFile = function(){
            $scope.file = null;
        }

        $scope.close = function(){
            $scope.receiver = null
            $scope.user = null;
            $scope.visible = false;
            $scope.messages = [];
            $scope.collection.$ref().off("child_added", $scope.onAddMessage);
        }

        $scope.open = function(user){
            $scope.visible = true;
            $scope.user = user;
        }

        $scope.switchChat = function(user){
            $scope.receiver = user;
            $scope.messages = [];
            $scope.collection = $firebaseArray(ref);
            $scope.collection.$ref().off("child_added", $scope.onAddMessage);
            $scope.collection.$ref().on("child_added", $scope.onAddMessage);
        }

        $scope.onAddMessage = function(snapshot){
            if(
                (snapshot.val().user == $scope.user && snapshot.val().receiver == $scope.receiver) || 
                (snapshot.val().receiver == $scope.user && snapshot.val().user == $scope.receiver)
            ){
                $scope.messages.push(snapshot.val());
                $scope.$broadcast('newMessage');
            }
        }

        $scope.$on('open', $scope.open);

        this.init();
    };

    var link = function(scope, element, attrs, ctrl){

        scope.$on('newMessage', function() {
            setTimeout(scrollIt, 10);
        });

        $('#button-file').on('click', function(){
            $('#file').click();
        })

        $('#edit').froalaEditor({
            toolbarBottom: true,
            toolbarButtons: ['bold', 'italic', 'underline', 'color'],
            toolbarButtonsMD: ['bold', 'italic', 'underline', 'color'],
            toolbarButtonsSM: ['bold', 'italic', 'underline', 'color'],
            toolbarButtonsXS: ['bold', 'italic', 'underline', 'color'],
        });

        $('#send').on('click', function(){
            scope.$apply(function(){
                scope.text = $('#edit').froalaEditor('html.get');
                scope.sendMessage();
                $('#edit').froalaEditor('html.set', '');
            });
        })

        function scrollIt(){
            $("#messages").scrollTop($("#messages")[0].scrollHeight);
        }
    }

    var template =  'views/chat.html';

    return {
        controllerAs : 'vm',
        controller: controller,
        link: link,
        templateUrl: template
    };
}

var ngModule = require('./index');
ngModule.directive('chat', [chat]);
/* jslint node:true */
'use strict';

 var angular = require('angular');
 
(function () {
  'use strict';

  angular.module('file-model', [])

  .directive('fileModel', [
    '$parse',
    function ($parse) {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;

          element.bind('change', function(){
            scope.$apply(function(){
              if (attrs.multiple) {
                modelSetter(scope, element[0].files);
              }
              else {
                modelSetter(scope, element[0].files[0]);
              }
            });
          });
        }
      };
    }
  ]);

})();

// var angular = require('angular');

// function fileModel($parse) {
//     return {
//         restrict: 'A',
//         link: function(scope, element, attrs) {
//             var model = $parse(attrs.fileModel);
//             var modelSetter = model.assign;

//             element.bind('change', function(){
//                 scope.$apply(function(){
//                     if (attrs.multiple) {
//                         modelSetter(scope, element[0].files);
//                     } else {
//                         modelSetter(scope, element[0].files[0]);
//                     }
//                 });
//             });
//         }
//     };
// }

// angular.module('file-model', []).directive('fileModel', [fileModel, $parse]);
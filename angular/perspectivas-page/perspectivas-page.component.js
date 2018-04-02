'use strict';

angular.
    module('perspectivasPage').
        component('perspectivasPage', {
            templateUrl: '../angular/perspectivas-page/perspectivas-page.html',
            controller: function PerspectivasPageController($scope){
                
                $scope.onSelect = onSelect;
                
                function onSelect(value){
                    $scope.selectedPerspectiva = value;
                }
            }
        });
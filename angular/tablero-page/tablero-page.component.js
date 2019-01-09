'use strict',

angular.
    module('tableroPage').
    component('tableroPage', {
        templateUrl: '../angular/tablero-page/tablero-page.html',
        controller: function TableroPageController($scope, GlobalStorageFactory){
            var controllerName = "TABLERO-PAGE-CONTROLLER -> ";
            
            $scope.perspectivasAfectantes = null;

            $scope.onSelectTreeItem = onSelectTreeItem;
            function onSelectTreeItem(item){
                // console.log(item);
                $scope.treeItemSelected = item;
            }

            $scope.estrategia = null;
            this.$onInit = function(){
            };

            this.$onChanges = function(changes){
            };

            $scope.$watch(function() { return GlobalStorageFactory.getEstrategia(); }, function(estrategiaSeleccionada) {
                if (estrategiaSeleccionada != undefined){ 
                    $scope.perspectivasAfectantes = estrategiaSeleccionada.perspectivasAfectantes;
                }
            });
        }
    });
'use strict',

angular.
    module('tableroPage').
    component('tableroPage', {
        templateUrl: '../angular/tablero-page/tablero-page.html',
        controller: function ResumenTableObjetivosController($scope){

            $scope.onSelectTreeItem = $scope.onSelectTreeItem;
            
            function onSelectTreeItem(item){
                $scope.treeItemSelected = item;
            } 
        }
    });
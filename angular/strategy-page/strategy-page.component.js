'use strict';

angular.
    module('strategyPage').
    component('strategyPage', {
        templateUrl: '../angular/strategy-page/strategy-page.html',
        controller: function ResumenTableObjetivosController($scope){

            $scope.onSelectTreeItem = $scope.onSelectTreeItem;
            
            function onSelectTreeItem(item){
                $scope.treeItemSelected = item;
            } 
        }
    });
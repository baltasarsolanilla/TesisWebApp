'use strict',

angular.
    module('tableroPage').
    component('tableroPage', {
        templateUrl: '../angular/tablero-page/tablero-page.html',
        controller: function TableroPageController($scope){
            var controllerName = "TABLERO-PAGE-CONTROLLER -> ";
            
            $scope.onSelectTreeItem = onSelectTreeItem;
            function onSelectTreeItem(item){
                console.log(controllerName);
                console.log(item);
                $scope.treeItemSelected = item;
            } 
        }
    });
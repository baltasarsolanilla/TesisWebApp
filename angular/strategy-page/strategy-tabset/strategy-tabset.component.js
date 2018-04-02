'use strict';

angular.
    module('strategyTabset').
    component('strategyTabset', {
        templateUrl: '../angular/strategy-page/strategy-tabset/strategy-tabset.html',
        controller: function StrategyTabsetController($scope, $window){
          $scope.tabs = [
            { title:'Resumen', content:'../angular/strategy-page/strategy-tabset/tabs/resumen-tab.html'},
            { title:'Detalle', content:'../angular/strategy-page/strategy-tabset/tabs/detalle-tab.html'}
          ];
        }
    });
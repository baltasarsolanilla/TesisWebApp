'use strict';

angular.
    module('strategyTabset').
    component('strategyTabset', {
        templateUrl: '../angular/strategy-tabset/strategy-tabset.template.html',
        controller: function StrategyTabsetController($scope, $window){
          $scope.tabs = [
            { title:'Resumen', content:'../angular/strategy-tabset/tabs/resumen-tab.html'},
            { title:'Detalle', content:'../angular/strategy-tabset/tabs/tab2.html'}
          ];
        }
    });
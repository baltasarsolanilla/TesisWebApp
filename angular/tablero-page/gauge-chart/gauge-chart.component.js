'use strict',

angular.
    module('gaugeChart').
        component('gaugeChart', {
            bindings: {
              data: '<'
            },
            templateUrl: '../angular/tablero-page/gauge-chart/gauge-chart.html',
            controller: function TableroTreeController($scope){
                var VERDE = '#91d202';
                var AMARILLO = '#f6d900';
                var NARANJA = '#FC8C28';
                var ROJO = '#eb4b25';

                $scope.threshold = {
                    '0': {color: ROJO},
                    '2.50': {color: NARANJA},
                    '5.00': {color: AMARILLO},
                    '7.50': {color: VERDE}
                  };
                
                this.$onInit = function(){
                    $scope.valor = 10.00;
                };

                this.$onChanges = function(changes){
                    if (changes.data.currentValue){
                      $scope.valor = changes.data.currentValue;
                    }
                };
            }   
        });
        
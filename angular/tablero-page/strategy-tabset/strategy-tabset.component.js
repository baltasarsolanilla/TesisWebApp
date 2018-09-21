'use strict',

angular.
    module('strategyTabset').
    component('strategyTabset', {
        bindings: {
          data: '<'
        },
        templateUrl: '../angular/tablero-page/strategy-tabset/strategy-tabset.html',
        controller: function StrategyTabsetController($scope){
          $scope.tabs = [
            { title:'Resumen', content:'../angular/tablero-page/strategy-tabset/tabs/resumen-tab.html'},
            { title:'Detalle', content:'../angular/tablero-page/strategy-tabset/tabs/detalle-tab.html'}
          ];

          $scope.objetivoSeleccionado = {}
          $scope.objetivoSeleccionado.nombre = "Objetivo A";

          $scope.indicadoresAfectantes = [
            {
              indicador: {"id":1,"nombre":"Nombre 1","valor":3.50},
              peso: 25.0
            },
            {
              indicador: {"id":2,"nombre":"Nombre 2","valor":6.50},
              peso: 25.0
            },
            {
              indicador: {"id":3,"nombre":"Nombre 3","valor":8.50},
              peso: 50.0
            }
          ];

          $scope.objetivosAfectantes = [
            {
              objetivoAfectante: {"id":1,"nombre":"Nombre 1","valor": 3.55,"tendencia":"ALTA"},
            },
            {
              objetivoAfectante: {"id":2,"nombre":"Nombre 2","valor": 6.55,"tendencia":"BAJA"},
            },
            {
              objetivoAfectante: {"id":3,"nombre":"Nombre 3","valor": 8.55,"tendencia":"MEDIA"},
            }
          ];

          this.$onInit = function(){

          }

          this.$onChanges = function(changes){
            if (changes.data.currentValue){
              console.log(changes);
            }
          }
        }
    });
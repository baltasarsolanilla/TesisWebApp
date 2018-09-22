'use strict',

angular.
    module('strategyTabset').
    component('strategyTabset', {
        bindings: {
          data: '<'
        },
        templateUrl: '../angular/tablero-page/strategy-tabset/strategy-tabset.html',
        controller: function StrategyTabsetController($scope, Objetivo){
          $scope.tabs = [
            { title:'Resumen', content:'../angular/tablero-page/strategy-tabset/tabs/resumen-tab.html'},
            { title:'Detalle', content:'../angular/tablero-page/strategy-tabset/tabs/detalle-tab.html'}
          ];

          $scope.objetivo = null;
          $scope.historico = [{
              valor: 2.28488, 
              fecha: "2018-09-2"
            },
            {
              valor: 3.568488, 
              fecha: "2018-09-2"
            },
            {
              valor: 6.528, 
              fecha: "2018-09-2"
            }
          ];

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

          };

          this.$onChanges = function(changes){
            console.log("onChanges ---------------------------------");
            if (changes.data.currentValue){
              var objetivo = changes.data.currentValue;
              $scope.objetivo = objetivo;
              $scope.indicadoresAfectantes = objetivo.indicadoresAfectantes;
              $scope.objetivosAfectantes = objetivo.objetivosAfectantes;
              cargarDataHistorica(objetivo.id)
            }
          };

          $scope.cargarDataHistorica = cargarDataHistorica;
          function cargarDataHistorica(idObjetivo){
            console.log("Valores historicos del objetivo: " +  $scope.objetivo.nombre);
            var fechaHasta = 23092018;
            var fechaDesde = 25082018;
            Objetivo.getHistorico({
              idObjetivo: idObjetivo,
              fromDate: fechaDesde,
              toDate: fechaHasta
            }, function(valoresHistoricos){
              console.log(valoresHistoricos);
              $scope.historico = valoresHistoricos;
            });
          }
        }
    });
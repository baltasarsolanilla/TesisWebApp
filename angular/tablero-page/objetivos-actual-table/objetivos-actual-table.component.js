'use strict',

angular.
    module('objetivosActualTable').
    component('objetivosActualTable', {
        bindings: {
          data: '<'              
        },
        templateUrl: '../angular/tablero-page/objetivos-actual-table/objetivos-actual-table.html',
        controller: function ResumenTableObjetivosController($scope, NgTableParams, BuilderTable){

            //Lista de indicadoresAfectantes si no anda inet -- asi va a llegar la lista.
            var indicadoresAfectantes = [
              {
                indicador: {"id":1,"nombre":"Nombre 1","valor":2.5},
                peso: 25.0
              },
              {
                indicador: {"id":2,"nombre":"Nombre 2","valor":5.5},
                peso: 25.0
              },
              {
                indicador: {"id":3,"nombre":"Nombre 3","valor":7.5},
                peso: 50.0
              }
            ];

            var originalData = [];
            var pesoTotal = 0.0;

            this.$onInit = function() {
              originalData = indicadoresAfectantes;
              if ($scope.$ctrl.data != undefined)
                originalData = $scope.$ctrl.data;
              $scope.tableParams = new NgTableParams({
                page: 1, // show first page
                count: 10 // count per page
                }, {
                counts: [],
                dataset: angular.copy(originalData)
              });
            };
            var pesoTotal = 0.0;
            this.$onChanges = function(changes){
              if (changes.data.currentValue){
                changeDataTable(changes.data.currentValue);
              }
            };

            //Esta funcion recarga el dataset con los indicadoresAfecantes del objetivo seleccionado
            function changeDataTable(data){
              originalData = data;
              pesoTotal = BuilderTable.getPesoTotal(data);
              $scope.tableParams.settings({
                dataset: angular.copy(originalData)
              });
              $scope.tableParams.reload();
            }
            
            $scope.setColorValor = function(valor){
              return BuilderTable.setColorValor(valor);
            }

            $scope.getPorcentaje = function(valor){
              return (valor / pesoTotal) * 100;
            }
        }
    });

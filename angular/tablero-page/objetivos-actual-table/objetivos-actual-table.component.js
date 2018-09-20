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
            // var indicadoresAfectantes = [
            //   {
            //     indicador: {"id":1,"nombre":"Nombre 1","valor":0.0},
            //     peso: '50'
            //   },
            //   {
            //     indicador: {"id":2,"nombre":"Nombre 2","valor":2.5},
            //     peso: '25'
            //   },
            //   {
            //     indicador: {"id":3,"nombre":"Nombre 3","valor":5.0},
            //     peso: '12.5'
            //   },
            //   {
            //     indicador: {"id":3,"nombre":"Nombre 3","valor":7.5},
            //     peso: '12.5'
            //   }
            // ];

             var indicadoresAfectantes = [{
              id: 1,
              nombre: 'Ganarle a Juanca',
              valor: 0.0,
              peso: 50
            },
            {
              id: 2,
              nombre: 'Perder el tiempo',
              valor: 2.5,
              peso: 12.5
            },
            {
              id: 3,
              nombre: 'Umota corriendo',
              valor: 5.0,
              peso: 25
            },
            {
              id: 4,
              nombre: 'Luna de colada',
              valor: 7.5,
              peso: 12.5
            }];

            var originalData = [];

            this.$onInit = function() {
              // fillRandomValue(indicadoresAfectantes);
              originalData = indicadoresAfectantes;
              $scope.tableParams = new NgTableParams({
                page: 1, // show first page
                count: indicadoresAfectantes.length // count per page
                }, {
                counts: [],
                dataset: angular.copy(indicadoresAfectantes)
              });
            };

            this.$onChanges = function(changes){
              if (changes.data.currentValue){
                changeDataTable(changes.data.currentValue);
              }
            };

            //Esta funcion recarga el dataset con los indicadoresAfecantes del objetivo seleccionado
            function changeDataTable(data){
              originalData = data;
              $scope.tableParams.settings({
                dataset: angular.copy(originalData)
              });
              $scope.tableParams.reload();
            }
            
            function fillRandomValue(array){
              array.forEach(element => {
                element.valor = BuilderTable.getRandomValor();
              });
            }
            
            $scope.setColorValor = function(valor){
              return BuilderTable.setColorValor(valor);
            }

            
    
            

            

        }
    });

'use strict',

angular.
    module('objetivosActualTable').
    component('objetivosActualTable', {
        templateUrl: '../angular/tablero-page/objetivos-actual-table/objetivos-actual-table.html',
        controller: function ResumenTableObjetivosController($scope, NgTableParams, BuilderTable){

            var kpi_data = [{
              id: 1,
              nombre: 'Ganarle a Juanca',
              //valor:
              //tendencia:
              peso: '50'
            },
            {
              id: 2,
              nombre: 'Perder el tiempo',
              peso: '12.5'
            },
            {
              id: 3,
              nombre: 'Umota corriendo',
              peso: '25'
            },
            {
              id: 4,
              nombre: 'Luna de colada',
              peso: '12.5'
            }];
            
            function fillData(array){
              array.forEach(element => {
                element.valor = BuilderTable.getRandomValor();
                element.tendencia = BuilderTable.getRandomTendencia();
              });
            }

            fillData(kpi_data);
            
            $scope.setColorValor = function(valor){
              return BuilderTable.setColorValor(valor);
            }
            
            // set color tendencia
            $scope.setColorTendencia = function(tendencia){
              return BuilderTable.setColorTendencia(tendencia);
            }
    
            // class="fas fa-arrow-circle-up"
            $scope.setArrowTendencia = function(tendencia){
              return BuilderTable.setArrowTendencia(tendencia);
            }
    
            $scope.tableParams = new NgTableParams({
                page: 1, // show first page
                count: kpi_data.length // count per page
                }, {
                counts: [],
                dataset: kpi_data
              });
        }
    });

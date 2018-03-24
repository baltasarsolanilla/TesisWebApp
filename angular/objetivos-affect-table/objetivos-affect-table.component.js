'use strict';

angular.
    module('objetivosAffectTable').
    component('objetivosAffectTable', {
        templateUrl: '../angular/objetivos-affect-table/objetivos-affect-table.template.html',
        controller: function objetivosAffectTableController($scope, NgTableParams, BuilderTable){

            var kpi_data = [{
              id: 1,
              nombre: 'Jugar al tennis',
              //valor:
              //tendencia: 
            },
            {
              id: 2,
              nombre: 'Aprender AngularJS',
            },
            {
              id: 3,
              nombre: 'Funcional',
            },
            {
              id: 4,
              nombre: 'Leer Harry Potter III',
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

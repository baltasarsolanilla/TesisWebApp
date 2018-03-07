'use strict';

angular.
    module('objetivosAffectTable').
    component('objetivosAffectTable', {
        templateUrl: '../angular/objetivos-affect-table/objetivos-affect-table.template.html',
        controller: function objetivosAffectTableController($scope, NgTableParams){

            var kpi_data = [{
              id: 1,
              nombre: 'Jugar al tennis',
              valor: '10.0',
              tendencia: 'ALTA',
            },
            {
              id: 2,
              nombre: 'Aprender AngularJS',
              valor: '4.20',
              tendencia: 'MEDIA',
            },
            {
              id: 3,
              nombre: 'Funcional',
              valor: '5.4',
              tendencia: 'MEDIA',
            },
            {
              id: 4,
              nombre: 'Leer Harry Potter II',
              valor: '2.4',
              tendencia: 'BAJA',
            }];

            $scope.setColorValor = function(valor){
              if (valor > 6.66)
                return {color:'green'}
              else if (valor > 3.33)
                return {color:'rgb(245, 234, 89)'}
              else
                return {color:'rgba(243, 4, 4, 0.918)'}
            }
            
            // set color tendencia
            $scope.setColorTendencia = function(valor){
              if (valor === 'ALTA')
                return {color:'green'}
              else if (valor === 'MEDIA')
                return {color:'rgb(245, 234, 89)'}
              else
                return {color:'rgba(243, 4, 4, 0.918)'}
            }
    
            // class="fas fa-arrow-circle-up"
            $scope.setArrowTendencia = function(valor){
              if (valor === 'ALTA')
                return 'fas fa-arrow-circle-up'
              else if (valor === 'MEDIA')
                return 'fas fa-arrow-circle-left'
              else
                return 'fas fa-arrow-circle-down'
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

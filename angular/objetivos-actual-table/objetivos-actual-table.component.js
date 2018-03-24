'use strict';

angular.
    module('objetivosActualTable').
    component('objetivosActualTable', {
        templateUrl: '../angular/objetivos-actual-table/objetivos-actual-table.template.html',
        controller: function ResumenTableObjetivosController($scope, NgTableParams){

            var kpi_data = [{
              id: 1,
              nombre: 'Ganarle a Juanca',
              valor: '6.77',
              tendencia: 'ALTA',
              peso: '50'
            },
            {
              id: 2,
              nombre: 'Perder el tiempo',
              valor: '4.20',
              tendencia: 'BAJA',
              peso: '12.5'
            },
            {
              id: 3,
              nombre: 'Umota corriendo',
              valor: '5.4',
              tendencia: 'ALTA',
              peso: '25'
            },
            {
              id: 4,
              nombre: 'Luna de colada',
              valor: '2.4',
              tendencia: 'MEDIA',
              peso: '12.5'
            }];
            
            $scope.setColorValor = function(valor){
              if (valor > 6.66)
                return {color:'green'}
              else if (valor > 3.33)
                return {color:'#FFDD00'}
              else
                return {color:'rgba(243, 4, 4, 0.918)'}
            }
            
            // set color tendencia
            $scope.setColorTendencia = function(valor){
              if (valor === 'ALTA')
                return {color:'green'}
              else if (valor === 'MEDIA')
                return {color:'#FFDD00'}
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

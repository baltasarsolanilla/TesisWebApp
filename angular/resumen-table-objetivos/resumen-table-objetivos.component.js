'use strict';

angular.
    module('resumenTableObjetivos').
    component('resumenTableObjetivos', {
        templateUrl: '../angular/resumen-table-objetivos/resumen-table-objetivos.template.html',
        controller: function ResumenTableObjetivosController($scope, NgTableParams){

            var kpi_data = [{
              id: 1,
              nombre: 'Ganarle a Juanca',
              valor: '6.77',
              tendencia: '1',
              peso: '50'
            },
            {
              id: 2,
              nombre: 'Perder el tiempo',
              valor: '4.20',
              tendencia: '1',
              peso: '12.5'
            },
            {
              id: 3,
              nombre: 'Umota corriendo',
              valor: '5.4',
              tendencia: '1',
              peso: '25'
            },
            {
              id: 4,
              nombre: 'Luna de colada',
              valor: '2.4',
              tendencia: '1',
              peso: '12.5'
            }];
            
            // set color
            this.setColor = function(valor){
              if (valor < 3.33)
                return {color:'rgba(243, 4, 4, 0.918)'}
              else if (valor < 6.66)
                return {color:'#FFDD00'}
              else
                return {color:'green'}
            }
    
            // class="fas fa-arrow-circle-up"
            this.setArrow = function(valor){
              if (valor < 3.33)
                return 'fas fa-arrow-circle-down'
              else if (valor < 6.66)
                return 'fas fa-arrow-circle-left'
              else
                return 'fas fa-arrow-circle-up'
            }
    
            this.tableParams = new NgTableParams({
                page: 1, // show first page
                count: kpi_data.length // count per page
                }, {
                counts: [],
                dataset: kpi_data
              });
        }
    });

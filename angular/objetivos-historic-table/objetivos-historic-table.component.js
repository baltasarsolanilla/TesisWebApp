'use strict';

angular.
    module('objetivosHistoricTable').
    component('objetivosHistoricTable', {
        templateUrl: '../angular/objetivos-historic-table/objetivos-historic-table.template.html',
        controller: function objetivosHistoricTableController($scope, NgTableParams){
            // tip: to debug, open chrome dev tools and uncomment the following line 
            //debugger;

            var data = [{
                id: 1,
                fecha: 'Marzo 2017',
                valor_kpi_1: '7',
                valor_kpi_2: '3',
                valor_kpi_3: '4',
                valor_kpi_4: '8',
                total: '2'
            },
            {
                id: 2,
                fecha: 'Abril 2017',
                valor_kpi_1: '2',
                valor_kpi_2: '5',
                valor_kpi_3: '8',
                valor_kpi_4: '3',
                total: '4'
            },
            {
                id: 3,
                fecha: 'Mayo 2017',
                valor_kpi_1: '8',
                valor_kpi_2: '4',
                valor_kpi_3: '2',
                valor_kpi_4: '7',
                total: '9'
            },
            {
                id: 4,
                fecha: 'Junio 2017',
                valor_kpi_1: '3',
                valor_kpi_2: '7',
                valor_kpi_3: '4',
                valor_kpi_4: '2',
                total: '8'
            }];
        
            $scope.cols = [
                {
                title: 'FECHA',
                field: 'fecha',
                sortable: 'id' //ASI LO ORDENO POR FECHA CORRECTAMENTE -> OBVIO TIENE Q ESTAR BIEN CARGADO ASCENDENTE/DESCENDENTE
                
                },
                {
                title: 'KPI-1',
                field: 'valor_kpi_1',
                sortable: 'valor_kpi_1'
                },
                {
                title: 'KPI-2',
                field: 'valor_kpi_2',
                sortable: 'valor_kpi_2'
                },
                {
                title: 'KPI-3',
                field: 'valor_kpi_3',
                sortable: 'valor_kpi_3'
                },
                {
                title: 'KPI-4',
                field: 'valor_kpi_4',
                sortable: 'valor_kpi_4'
                },
                {
                title: 'TOTAL',
                field: 'total',
                sortable: 'total'
                },
            ]
        
            $scope.setColor = function(row, columna){
                var style = '';
                switch(columna) {
                case 0:
                    return '';
                    break;
                case 1:
                    return this.getColor(row.valor_kpi_1);
                    break;
                case 2: 
                    return this.getColor(row.valor_kpi_2);
                    break;
                case 3:
                    return this.getColor(row.valor_kpi_3);
                    break;
                case 4:
                    return this.getColor(row.valor_kpi_4);
                    break;
                case 5:
                    return this.getColor(row.total);
                    break;
                default:
                    return {color: 'black'};  
                }
            }
        
            $scope.getColor = function(valor) {
                if (valor < 3.33)
                return {color:'rgba(243, 4, 4, 0.918)'}
                else if (valor < 6.66)
                return {color:'#FFDD00'}
                else
                return {color:'green'}
            }
            
            $scope.tableParams = new NgTableParams({
                page: 1, // show first page
                count: 10 // count per page
                }, 
                {
                filterDelay: 0,
                counts: [],
                dataset: data
                });
            }
    });
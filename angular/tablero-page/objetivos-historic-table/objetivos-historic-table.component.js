'use strict',

angular.
    module('objetivosHistoricTable').
    component('objetivosHistoricTable', {
        templateUrl: '../angular/tablero-page/objetivos-historic-table/objetivos-historic-table.html',
        controller: function objetivosHistoricTableController($scope, NgTableParams, BuilderTable){
            // tip: to debug, open chrome dev tools and uncomment the following line 
            //debugger;

            var data = [{
                id: 1,
                fecha: 'Enero 2016'
                //valor_kpi_1: 
                //valor_kpi_2: 
                //valor_kpi_3: 
                //valor_kpi_4:
                //total:
            },
            {
                id: 2,
                fecha: 'Febrero 2016'
            },
            {
                id: 3,
                fecha: 'Marzo 2016'
            },
            {
                id: 4,
                fecha: 'Abril 2016'
            },
            {
                id: 5,
                fecha: 'Mayo 2016'
            },
            {
                id: 6,
                fecha: 'Junio 2016'
            },
            {
                id: 7,
                fecha: 'Julio 2016'
            },
            {
                id: 8,
                fecha: 'Agosto 2016'
            },
            {
                id: 9,
                fecha: 'Septiembre 2016'
            },
            {
                id: 10,
                fecha: 'Octubre 2016'
            },
            {
                id: 11,
                fecha: 'Novimebre 2016'
            },
            {
                id: 12,
                fecha: 'Diciembre 2016'
            },
            {
                id: 13,
                fecha: 'Enero 2017'
            },{
                id: 14,
                fecha: 'Febrero 2017'
            },
            {
                id: 15,
                fecha: 'Marzo 2017'
            },
            {
                id: 16,
                fecha: 'Abril 2017'
            }];

            function fillData(data){
                data.forEach(element => {
                    element.valor_kpi_1 = BuilderTable.getRandomValor();
                    element.valor_kpi_2 = BuilderTable.getRandomValor();
                    element.valor_kpi_3 = BuilderTable.getRandomValor();
                    element.valor_kpi_4 = BuilderTable.getRandomValor();
                    element.total = BuilderTable.getRandomValor();
                });
            }

            fillData(data);
        
            $scope.cols = [
                {
                title: 'FECHA',
                field: 'fecha',
                sortable: 'id', //ASI LO ORDENO POR FECHA CORRECTAMENTE -> OBVIO TIENE Q ESTAR BIEN CARGADO ASCENDENTE/DESCENDENTE
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
                    return {'text-align':'left'};
                    break;
                case 1:
                    return BuilderTable.setColorValor(row.valor_kpi_1);
                    break;
                case 2: 
                    return BuilderTable.setColorValor(row.valor_kpi_2);
                    break;
                case 3:
                    return BuilderTable.setColorValor(row.valor_kpi_3);
                    break;
                case 4:
                    return BuilderTable.setColorValor(row.valor_kpi_4);
                    break;
                case 5:
                    return BuilderTable.setColorValor(row.total);
                    break;
                default:
                    return {color: 'black'};  
                }
            }

            $scope.filter = {
                fecha: undefined
            }
            
            $scope.tableParams = new NgTableParams({
                page: 1, // show first page
                count: 12, // count per page
                filter: $scope.filter
                }, 
                {
                filterDelay: 0,
                counts: [],
                dataset: data
                });
            }
    });
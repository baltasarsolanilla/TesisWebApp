'use strict',

angular.
    module('kpiAllTable').
    component('kpiAllTable', {
        templateUrl: '../angular/indicadores-page/kpi-all-table/kpi-all-table.html',
        bindings: {
          data: '<',
        },
        controller: function ResumenTableObjetivosController($scope, NgTableParams, BuilderTable){
            var controllerName = "KPI-ALL-TABLE-CONTROLLER -> ";
          
            var kpi_data = [{
              id: 1,
              nombre: 'Ganarle a Juanca',
              valor: 5.5
            }];

            this.$onInit = function() {
              $scope.tableParams = new NgTableParams({
                page: 1, // show first page
                count: 10 // count per page
                }, {
                counts: [],
                dataset: kpi_data
              });
            };

            this.$onChanges = function(changes){
              if (changes.data.currentValue){
                changeDataTable(changes.data.currentValue);                
              }
            };

            function changeDataTable(data){
              if ($scope.tableParams == undefined){
                $scope.tableParams = new NgTableParams({
                  page: 1, // show first page
                  count: 10 // count per page
                  }, {
                  counts: [],
                  dataset: kpi_data
                });
              }
              $scope.tableParams.settings({
                dataset: angular.copy(data)
              });
              $scope.tableParams.reload();
            }

            // set color valor
            $scope.setColorValor = function(valor){
              return BuilderTable.setColorValor(valor);
            }
        }
    });
'use strict',

angular.
    module('kpiAllTable').
    component('kpiAllTable', {
        templateUrl: '../angular/indicadores-page/kpi-all-table/kpi-all-table.html',
        bindings: {
          data: '<',
          onSelect: '&'
        },
        controller: function ResumenTableObjetivosController($scope, NgTableParams, BuilderTable){
            var controllerName = "KPI-ALL-TABLE-CONTROLLER -> ";
          
            var kpi_data = [{
              id: 1,
              nombre: 'Ganarle a Juanca',
              valor: 5.5
              //tendencia:
            }];

            this.$onInit = function() {
              fillRandomTendencia(kpi_data);
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
              fillRandomTendencia(data);
              $scope.tableParams.settings({
                dataset: angular.copy(data)
              });
              $scope.tableParams.reload();
            }

            function fillRandomTendencia(array){
              array.forEach(element => {
                element.tendencia = BuilderTable.getRandomTendencia();
              });
            }

            // set color valor
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
            
            $scope.onSelectIndicador = onSelectIndicador;
            $scope.selectedIndicador = null;

            function onSelectIndicador(value){
              $scope.selectedIndicador = value;
              $scope.$ctrl.onSelect({indicador: $scope.selectedIndicador});
            }
        }
    });
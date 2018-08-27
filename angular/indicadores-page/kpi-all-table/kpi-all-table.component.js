'use strict',

angular.
    module('kpiAllTable').
    component('kpiAllTable', {
        templateUrl: '../angular/indicadores-page/kpi-all-table/kpi-all-table.html',
        bindings: {
          onUpdate: '&'
        },
        controller: function ResumenTableObjetivosController($scope, NgTableParams, BuilderTable, $window){

            $scope.onSelectItem = onSelectItem;
            
            //Varibles de controller
            var controllerName = "KPI-ALL-TABLE-CONTROLLER -> ";
            $scope.selectedItem = null;

            var kpi_data = [{
              id: 1,
              nombre: 'Ganarle a Juanca',
              //valor:
              //tendencia:
            },
            {
              id: 2,
              nombre: 'Perder el tiempo',
            },
            {
              id: 3,
              nombre: 'Umota corriendo',
            },
            {
              id: 4,
              nombre: 'Luna de colada',
            }];
            
            function fillData(array){
              array.forEach(element => {
                element.valor = BuilderTable.getRandomValor();
                element.tendencia = BuilderTable.getRandomTendencia();
              });
            }

            fillData(kpi_data);

            
            var ctrl = this;
            //Filas clikeables
            function onSelectItem(value){
              $window.console.log(controllerName + "onSelectItem(value)");
              $scope.selectedItem = value;
              ctrl.onUpdate({idIndicador: $scope.selectedItem.id});
              $window.console.log(controllerName + " id: " + $scope.selectedItem.id);
            }


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
'use strict',

angular.
    module('objetivosAffectTable').
    component('objetivosAffectTable', {
        bindings: {
          data: '<'             
        },
        templateUrl: '../angular/tablero-page/objetivos-affect-table/objetivos-affect-table.html',
        controller: function objetivosAffectTableController($scope, NgTableParams, BuilderTable){
            var controllerName = "OBJETIVOS-AFFECT-TABLE-CONTROLLER -> ";

            //Lista de ObjetivosAfectantes en caso de que no se seleccione un objetivo por default.
            var objetivosAfectantesFAKE = [
              {
                objetivoAfectante: {"id":1,"nombre":"Nombre 1","valor": 2.5,"tendencia":"ALTA"},
              },
              {
                objetivoAfectante: {"id":2,"nombre":"Nombre 2","valor": 5.5,"tendencia":"BAJA"},
              },
              {
                objetivoAfectante: {"id":3,"nombre":"Nombre 3","valor": 7.5,"tendencia":"MEDIA"},
              }
            ];


            var originalData = [];

            this.$onInit = function() {
              originalData = objetivosAfectantesFAKE;
              if ($scope.$ctrl.data != undefined)
                originalData = $scope.$ctrl.data;
              $scope.tableParams = new NgTableParams({
                page: 1, // show first page
                count: 10 // count per page
                }, {
                counts: [],
                dataset: angular.copy(originalData)
              });
            };

            this.$onChanges = function(changes){
              if (changes.data.currentValue){
                changeDataTable(changes.data.currentValue);
              }
            };

            //Esta funcion recarga el dataset con los objetivosAfecantes del objetivo seleccionado
            function changeDataTable(data){
              originalData = data;
              $scope.tableParams.settings({
                dataset: angular.copy(originalData)
              });
              $scope.tableParams.reload();
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
        }
    });

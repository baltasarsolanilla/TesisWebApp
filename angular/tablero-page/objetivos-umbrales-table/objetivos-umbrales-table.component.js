'use strict',

angular.
    module('objetivosUmbralesTable').
    component('objetivosUmbralesTable', {
        bindings: {
          data: '<'             
        },
        templateUrl: '../angular/tablero-page/objetivos-umbrales-table/objetivos-umbrales-table.html',
        controller: function objetivosUmbralesTableController($scope, NgTableParams, BuilderTable){
            var controllerName = "OBJETIVOS-UMBRALES-TABLE-CONTROLLER -> ";

            //Lista de umbrales en caso de que no se seleccione un objetivo por default.
            var umbralesFAKE= [
              {
                umbral: {"id":1,"valor": "[0.00-2.50)","estado":"MALO"},
              },
              {
                umbral: {"id":2,"valor": "[2.50-5.00)","estado":"REGULAR"},
              },
              {
                umbral: {"id":3,"valor": "[5.00-7.50)","estado":"BUENO"},
              },
              {
                umbral: {"id":4,"valor": "[7.50-10.00]","estado":"MUY BUENO"},
              }
            ];


            var originalData = [];

            this.$onInit = function() {
              originalData = umbralesFAKE;
              $scope.tableParams = new NgTableParams({
                page: 1, // show first page
                count: 10 // count per page
                }, {
                counts: [],
                dataset: angular.copy(originalData)
              });
            };

            $scope.setColorValor = function(estado){
                var valorNumerico;
                if (estado == "MALO")
                    valorNumerico=0.00;
                if (estado == "REGULAR")
                    valorNumerico=2.50;
                if (estado == "BUENO")
                    valorNumerico=5.00;
                if (estado == "MUY BUENO")
                    valorNumerico=7.50;
                return BuilderTable.setColorValor(valorNumerico);
            }
    
        }
    });

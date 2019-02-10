'use strict',

angular.
    module('objetivosHistoricTable').
    component('objetivosHistoricTable', {
        bindings: {
            data: '<'
        },
        templateUrl: '../angular/tablero-page/objetivos-historic-table/objetivos-historic-table.html',
        controller: function objetivosHistoricTableController($scope, NgTableParams, BuilderTable){
            // tip: to debug, open chrome dev tools and uncomment the following line 
            //debugger;
            // LA TENDENCIA NO SE MUESTRA MÁS -- LIMPIAR CUANDO SE QUIERA
            var data = [{
                    // id: 0
                    fecha: 'Enero 2016',
                    valor: 2.5,
                    // tendencia: 'ALTA' 
                },
                {
                    // id: 1
                    fecha: 'Febrero 2016',
                    valor: 2.5,
                    // tendencia: 'BAJA',
                },
                {
                    // id: 2
                    fecha: 'Marzo 2016',
                    valor: 7.5,
                    // tendencia: 'MEDIA'
                }
            ];

            var originalData = [];

            this.$onInit = function() {
              originalData = formatearData(data);
              $scope.tableParams = new NgTableParams({
                page: 1, // show first page
                count: 10, // count per page
                filter: $scope.filter
                }, {
                filterDelay: 0,
                counts: [],
                dataset: angular.copy(originalData)
              });              
            };

            this.$onChanges = function(changes){
                if (changes.data.currentValue){
                  changeDataTable(changes.data.currentValue);
                }
              };
  
            //Esta funcion recarga el dataset con los indicadoresAfecantes del objetivo seleccionado
            function changeDataTable(data){
                if ($scope.tableParams == undefined){
                    $scope.tableParams = new NgTableParams({
                        page: 1, // show first page
                        count: 10, // count per page
                        filter: $scope.filter
                        }, {
                        filterDelay: 0,
                        counts: [],
                        dataset: angular.copy(originalData)
                    });    
                }
                
                originalData = formatearData(data);
                $scope.tableParams.settings({
                    dataset: angular.copy(originalData)
                    });
                $scope.tableParams.reload();
            }
            
            function formatearData(valoresHistoricos){
                var id = 0;
                angular.forEach(valoresHistoricos, function(i){
                    i.id = id++;
                });
                valoresHistoricos = addTendencias(valoresHistoricos);
                // console.log(valoresHistoricos);
                return valoresHistoricos;
            }

            function addTendencias(valoresHistoricos){
                angular.forEach(valoresHistoricos, function(i){
                    var newValue = i.valor;
                    var oldValue = null;
                    var nextValueHistorico = valoresHistoricos.filter(j => {
                        return j.id === i.id+1;
                    });
                    if (nextValueHistorico.length > 0){
                        oldValue = nextValueHistorico[0].valor;
                    }
                    else{ //Para el caso de ser el ultimo elemento.
                        oldValue = newValue;
                    }
                    // i.tendencia = BuilderTable.getTendencia(newValue, oldValue);

                });
                return valoresHistoricos;
            }

            //set color valor
            $scope.setColorValor = function(valor){
                return BuilderTable.setColorValor(valor);
            };

            // set color tendencia
            $scope.setColorTendencia = function(tendencia){
                return BuilderTable.setColorTendencia(tendencia);
            };
      
            // class="fas fa-arrow-circle-up"
            $scope.setArrowTendencia = function(tendencia){
                return BuilderTable.setArrowTendencia(tendencia);
            };

            $scope.filter = {
                fecha: undefined
            };
            
        }
    });
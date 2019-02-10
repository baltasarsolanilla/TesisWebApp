'use strict',

angular.
    module('balancedScorecard').
    controller('balancedScorecardController', function($scope, Estrategia, GlobalStorageFactory) {
        $scope.greeting = '- balancedScorecardController';

        
        //Funciones
        $scope.cargarEstrategias = cargarEstrategias;
        $scope.onSelectEstrategia = onSelectEstrategia;
        $scope.selectDefault = "FIRST";

        //Atributos
        $scope.estrategias = [];



        this.$onInit = function() {
            cargarEstrategias();
        };

        this.$onChanges = function(changes){

        };

        function cargarEstrategias(){
            Estrategia.query(function(estrategias){
                delete estrategias.$promise;
                delete estrategias.$resolved;                
                $scope.estrategias = estrategias;
            });
        }

        function onSelectEstrategia(value){
            if (value){
                Estrategia.get({idEstrategia: value.id}, function(estrategia){
                    GlobalStorageFactory.setEstrategia(estrategia);
                });
            }
            
            
        }

        $scope.$watch(function(){return GlobalStorageFactory.getActualizarEstrategias();}, function(actualizar) {
            if (actualizar == true){
                var accion = GlobalStorageFactory.getAccion();
                if (accion == "CREATE"){
                    $scope.selectDefault = "LAST";
                }
                if (accion == "UPDATE"){
                    $scope.selectDefault = "NO_CHANGE";
                }
                if (accion == "DELETE"){
                    $scope.selectDefault = "FIRST";
                }
                cargarEstrategias();
                GlobalStorageFactory.setActualizarEstrategias(false);
            }
        });

      });
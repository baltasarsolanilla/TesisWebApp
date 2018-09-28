'use strict',

angular.
    module('balancedScorecard').
    controller('balancedScorecardController', function($scope, Estrategia, GlobalStorageFactory) {
        $scope.greeting = '- balancedScorecardController';

        
        //Funciones
        $scope.cargarEstrategias = cargarEstrategias;
        $scope.onSelectEstrategia = onSelectEstrategia;

        //Atributos
        $scope.estrategias = [];
        $scope.estrategiaSeleccionada = null;



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
                console.log($scope.estrategias);
            });
        }

        function onSelectEstrategia(value){
            $scope.estrategiaSeleccionada = value;
            GlobalStorageFactory.setEstrategia($scope.estrategiaSeleccionada);
        }

      });
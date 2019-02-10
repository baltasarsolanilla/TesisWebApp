'use strict',

angular.
    module('strategyTabset').
    component('strategyTabset', {
        bindings: {
          data: '<'
        },
        templateUrl: '../angular/tablero-page/strategy-tabset/strategy-tabset.html',
        controller: function StrategyTabsetController($scope, Objetivo){
          $scope.tabs = [
            { title:'Resumen', content:'../angular/tablero-page/strategy-tabset/tabs/resumen-tab.html'},
            { title:'Detalle', content:'../angular/tablero-page/strategy-tabset/tabs/detalle-tab.html'}
          ];

          $scope.objetivo = null;
          $scope.objetivo = {
            nombre: "Nombre del objetivo"
          };
          $scope.historico = [{
              valor: 2.28488, 
              fecha: "2018-09-2"
            },
            {
              valor: 3.568488, 
              fecha: "2018-09-2"
            },
            {
              valor: 6.528, 
              fecha: "2018-09-2"
            }
          ];

          $scope.indicadoresAfectantes = [
            {
              indicador: {"id":1,"nombre":"Nombre 1","valor":3.50},
              peso: 25.0
            },
            {
              indicador: {"id":2,"nombre":"Nombre 2","valor":6.50},
              peso: 25.0
            },
            {
              indicador: {"id":3,"nombre":"Nombre 3","valor":8.50},
              peso: 50.0
            }
          ];

          $scope.objetivosAfectantes = [
            {
              objetivoAfectante: {"id":1,"nombre":"Nombre 1","valor": 3.55,"tendencia":"ALTA"},
            },
            {
              objetivoAfectante: {"id":2,"nombre":"Nombre 2","valor": 6.55,"tendencia":"BAJA"},
            },
            {
              objetivoAfectante: {"id":3,"nombre":"Nombre 3","valor": 8.55,"tendencia":"MEDIA"},
            }
          ];

          this.$onInit = function(){
          };

          this.$onChanges = function(changes){
            if (changes.data.currentValue){
              var objetivo = changes.data.currentValue;
              $scope.objetivo = objetivo;
              $scope.indicadoresAfectantes = objetivo.indicadoresAfectantes;
              $scope.objetivosAfectantes = objetivo.objetivosAfectantes;
              cargarDataHistorica(objetivo.id);
            }
          };

          $scope.cargarDataHistorica = cargarDataHistorica;
          function cargarDataHistorica(idObjetivo){
            // console.log("Valores historicos del objetivo: " +  $scope.objetivo.nombre);
            //La fecheHasta tiene que ser hasta 1 día POSTERIOR a cuando está el dato ya que la HORA va a ser todo 0.
            //dia-mes-año
            //Entonces si el dato es del 13/11/2018, para recuperarlo: fechaHasta=14112018.   
            //El request tiene la forma final:
            //http://localhost:8080/objetivos/valoresHistoricos?fromDate=18082018&toDate=14112018
            var fechaDesde = '01012000';
            var fechaHasta = getFechaMañana();
            Objetivo.getHistorico({
              idObjetivo: idObjetivo,
              fromDate: fechaDesde,
              toDate: fechaHasta
            }, function(valoresHistoricos){
                $scope.historico = valoresHistoricos;
            }, function (err) {
                console.log("ERROR recuperando valores historicos");
            });
          }

            // VER EL FORMATO -- la funcion backend no espera las barras '/'
          function getFechaMañana(){
            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            var dd = tomorrow.getDate(); //Incluyo HOY;
            var mm = tomorrow.getMonth()+1; //January is 0!
            var yyyy = tomorrow.getFullYear();

            if(dd<10) {
                dd = '0'+dd;
            } 

            if(mm<10) {
                mm = '0'+mm;
            } 

            return dd + "" + mm + "" +yyyy;
          }
        }

        
    });
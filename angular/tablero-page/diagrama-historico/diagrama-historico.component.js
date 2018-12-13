
angular.
module('diagramaHistorico').
component('diagramaHistorico', {
    templateUrl: '../angular/tablero-page/diagrama-historico/diagrama-historico.html',
    controller: function DiagramaHistoricoController($scope, $timeout){
        $scope.hello ="Diagrama histórico";
        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.series = ['MALO', 'REGULAR', 'BUENO', 'MUY BUENO', 'VALOR'];
        $scope.data = [
            [2.50, 2.50, 2.50, 2.50, 2.50, 2.50, 2.50],
            [5.00, 5.00, 5.00, 5.00, 5.00, 5.00, 5.00],
            [7.50, 7.50, 7.50, 7.50, 7.50, 7.50, 7.50],
            [10.00, 10.00, 10.00, 10.00, 10.00, 10.00, 10.00],
            [2.00, 3.80, 6.20, 1.40, 7.30, 9.90, 7.60],
        ];
        var VERDE = '#91d202';
        var AMARILLO = '#f6d900';
        var NARANJA = '#FC8C28';
        var ROJO = '#eb4b25';
        var NEGRO = '#000000';
        $scope.colors = [ROJO, NARANJA, AMARILLO, VERDE, NEGRO];

        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };
        
        $scope.options = {
            scales: {
                yAxes: [
                    {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            }
        };

        // Parte de los pibes integrada
        $scope.graficarFechaDesdeHasta = function(){
            console.log("Fecha desde:",$("#fechaDesdeInput").val());
            console.log("Fecha hasta:",$("#fechaHastaInput").val());
            if ($("#fechaDesdeInput").val() == ""){
                return;
            }
            if ($("#fechaHastaInput").val() == ""){
                return;
            }
          else{
                prepararValores(); //DATA Y LABELS
            // graficar(result.umbralesPorIndicador);

            
            
            //   Indicadores.getIndicadorDesdeHasta({idIndicador: $scope.idIndicador, 
            //                                       desde:$("#fechaDesdeInput").val(),
            //                                       hasta:$("#fechaHastaInput").val()}, function(result, responseHeaders){
            //       if (result != null){
            //              prepararValores(result.valorIndicador);
            //             graficar(result.umbralesPorIndicador);
            //           Notification.success({message: 'Indicador actualizado correctamente', positionX: 'center', closeOnClick: 'true'});
            //       }
            //   },function(httpResponse){
            //       console.log(httpResponse.data);
            //       Notification.error({title: 'Error al obtener los datos del indicador', message: 'click para cerrar', positionX: 'center', closeOnClick: 'true'});
            //   });
          }
      }
        
    }
});
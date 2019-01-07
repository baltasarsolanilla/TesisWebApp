'use strict';

angular.module('sbAdminApp')
	.controller(
		'DetalleIndicadorCtrl',
		function($scope, $http, $state, $stateParams, Notification, Indicadores, DetalleIndicador, IndicadorFtry) {
			
			$scope.idIndicador =  $stateParams.idIndicador;
			$scope.indicador = {};
			$scope.listaLabels = [];
			$scope.listaLabelsFormateada = [];
			$scope.listaValores = [];
			$scope.listaUmbrales = [];
			$scope.listaLeyenda = [];
			$scope.listaColores = [];
			$scope.editaPeriodo = false;
			
			
			angular.element(document).ready(function () {
				getIndicadorAGraficar($scope.idIndicador);
		    });
			
			
			
			
			/***
			 * INICIO FUNCIONES GRAFICO DE LINEAS
			 ***/
			
			$scope.graficarFechaDesdeHasta = function(){
		  	    if ($("#fechaDesdeInput").val() == ""){
		  	    	Notification.error({title: 'Seleccione una fecha de inicio.', positionX: 'center', closeOnClick: 'true'});
		  	    	return true;
		  		}
		  	    if ($("#fechaHastaInput").val() == ""){
		  	    	Notification.error({title: 'Seleccione una fecha fin.', positionX: 'center', closeOnClick: 'true'});
		  	    	return true;
		  		}
				else{
					Indicadores.getIndicadorDesdeHasta({idIndicador: $scope.idIndicador, 
														desde:$("#fechaDesdeInput").val(),
														hasta:$("#fechaHastaInput").val()}, function(result, responseHeaders){
				    	if (result != null){
				    		prepararValores(result.valorIndicador);
					  		graficar(result.umbralesPorIndicador);
							Notification.success({message: 'Indicador actualizado correctamente', positionX: 'center', closeOnClick: 'true'});
				    	}
			    	},function(httpResponse){
			    		// console.log(httpResponse.data);
			    		Notification.error({title: 'Error al obtener los datos del indicador', message: 'click para cerrar', positionX: 'center', closeOnClick: 'true'});
			    	});
				}
			}
			
			$scope.editarPeriodos = function(){
				$scope.editaPeriodo = true;
			}
			
			$scope.confirmarPeriodos = function(){
				var indicador = {};
				indicador.cantidadPeriodos = $scope.cantidadPeriodos;
				indicador.id = $scope.idIndicador;
				Indicadores.actualizarPeriodos(indicador, function(){
					getIndicadorAGraficar($scope.idIndicador);
			      }, 
			      function(httpResponse){
					    // console.log(httpResponse.data);
					    Notification.error({title: httpResponse.data, positionX: 'center'});
			    });
			}
			
			$scope.graficos = function(){
				$state.go('dashboard.chart');
			}
			
			$scope.editarUmbrales = function(){
				IndicadorFtry.direccion = DetalleIndicador.direccion;
				$state.go('dashboard.editarUmbrales');
			}
			
			function getIndicadorAGraficar(id){
				Indicadores.getIndicadorAGraficar({idIndicador: id}, function(result, responseHeaders){
			    	if (result != null){
			    		$scope.indicador = result;
			    		prepararValores(result.valorIndicador);
				  		graficar(result.umbralesPorIndicador);
				  		if(!$scope.editaPeriodo){
				  			graficarAguja();
				  		}
				  		$scope.editaPeriodo = false;
				  		Notification.success({message: 'Indicador actualizado correctamente', positionX: 'center', closeOnClick: 'true'});
			    	}
		    	},function(httpResponse){
		    			$scope.editaPeriodo = false;
		    			Notification.error({title: 'Error al obtener los datos del indicador', message: 'click para cerrar', positionX: 'center', closeOnClick: 'true'});
		    	});
			}
			
			function prepararValores(valores) {
		  		  if ($scope.listaValoresInd != null){
		  			  $scope.listaValoresInd.length = 0;
		  		  }
				  $scope.listaLabels.length = 0;
				  $scope.listaLabelsFormateada.length = 0;
				  $scope.listaValores.length = 0;
				  $scope.listaValoresInd = valores;
				  for (var i=0; i<$scope.listaValoresInd.length; i++){
					$scope.listaLabels.push($scope.listaValoresInd[i].fecha);
					$scope.listaLabelsFormateada.push($scope.listaValoresInd[i].fechaFormateada);
					$scope.listaValores.push($scope.listaValoresInd[i].valor);
				  }
		  	}
			
			function graficar(valores) {
				$scope.umbrales = valores;
				  
				function noContiene(arreglo, valor){
					var encontro = false;
					for(var i=0; i<arreglo.length && !encontro; i++){
						if(arreglo[i]== valor)
							encontro = true;
					}
					return encontro;
				}
			  
				//Cuenta la cantidad de Estados que tiene el indicador
				var estados = [];
				var encontro = false;
				for(var i=0; i<$scope.umbrales.length; i++){
					if(!noContiene(estados, $scope.umbrales[i].idEstadoTipoIndicador))
						estados.push($scope.umbrales[i].idEstadoTipoIndicador);
				}
				
				//Variables que se usan para saber la cantidad de estados y umbrales por estados
				var cantidadEstados = estados.length;
				var cantUmbralesEstado = $scope.umbrales.length / cantidadEstados;
				
				var lineas = new Array(cantidadEstados);
				for(var i=0; i<cantidadEstados; i++){
					lineas[i] = [];
				}
				
				
				//Crea un arreglo con un arreglo por cada umbral
				//Ej: Array:[estado1 a],[estado1 b]
				//			[estado2 a],[estado2 b]
				//			[estado3 a],[estado3 b]
				//			[estado4 a],[estado4 b]
				var count = 0;
				for(var i=0; i<$scope.umbrales.length; i++){
					if(count < cantidadEstados){
						lineas[count].push($scope.umbrales[i]);
						count += 1;
					}else{
						count = 0;
						lineas[count].push($scope.umbrales[i]);
						count += 1;
					}
				}
				
				
				//Declaracion de estructura que repetira cada umbral como valores le corresponda
				var lineasXFecha = new Array(cantidadEstados);
				for(var i=0; i<cantidadEstados; i++){
					lineasXFecha[i] = [];
				}
				
				
				function guardarUmbralEnLinas(umbralXEstado){
					for(var i=0; i<cantidadEstados; i++){
						lineasXFecha[i].push(lineas[i][umbralXEstado]);
					}
				}
				
				for(var i=0; i<$scope.listaLabels.length; i++){
					var guardo = false;
					for(var j=0; j<cantUmbralesEstado && !guardo; j++){
						//si la fecha del valor es >= al inicio del ultimo umbral
						if(lineas[0][cantUmbralesEstado-1].inicioUmbral<=$scope.listaLabels[i]){
							guardarUmbralEnLinas(cantUmbralesEstado-1);
							guardo = true;
								//si la fecha del valor >= al inicio del acutal y < al posterior umbral
						}else if((lineas[0][j].inicioUmbral<=$scope.listaLabels[i]) && ($scope.listaLabels[i]<lineas[0][j+1].inicioUmbral)){
							guardarUmbralEnLinas(j);
							guardo = true;
						}//else if notificar al usuario que esta ingresando fechas de los valores fuera de los rangos de la creacion de los umbrales
					}		
				}
				
				var k = 0;
				var h = 0;
			    $scope.listaUmbrales.length = 0;
			    $scope.listaLeyenda.length = 0;
			    $scope.listaColores.length = 0;
				for (k=0; k<lineasXFecha.length; k++){
					$scope.umbral=[];
					for (h=0; h<$scope.listaLabels.length; h++){
						$scope.umbral.push(lineasXFecha[k][h].valorUmbralSuperior);
					}
					$scope.listaLeyenda.push($scope.umbrales[k].nombreEstado)
					$scope.listaUmbrales.push($scope.umbral);
					var hex = rgb2hex($scope.umbrales[k].representacionCromatica);
					$scope.listaColores.push(hex);
				}
				$scope.listaUmbrales.push($scope.listaValores);
				$scope.listaLeyenda.push("Valor");
				//var hex = rgb2hex($scope.umbrales[$scope.umbrales.length-1].rgbColor);
				var hex = rgb2hex('rgb(0, 0, 0)');
				$scope.listaColores.push(hex);
				
				$scope.line = {
		    	    labels: $scope.listaLabelsFormateada,
		    	    series: $scope.listaLeyenda,
		    	    data: $scope.listaUmbrales,
		    	    colors : $scope.listaColores
		        };
			}
		    
		    function rgb2hex(rgb){
		    	 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
		    	 return (rgb && rgb.length === 4) ? "#" +
		    	  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
		    	  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
		    	  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
		    }
		    
			/***
			 * FIN FUNCIONES GRAFICO DE LINEAS
			 ***/
		    
		    
			/***
			 * INICIO FUNCIONES GRAFICO DE AGUJAS
			 ***/
		    
		    $scope.majorTicks = [];
			$scope.divisiones = [];
			$scope.colores = [];
			
			$scope.gauge = new Gauge({
				renderTo    : 'gauge',
				glow        : true,
				units       : 'Unidades',
				title       : false,
				majorTicks  : $scope.majorTicks,
				minorTicks  : 0,
				strokeTicks : true,
				highlights  : $scope.colores,
				maxValue    : false,
				colors      : {
					plate      : '#ffffff',
					majorTicks : '#000',
					minorTicks : '#000',
					title      : '#000',
					units      : '#000',
					numbers    : '#000',
					needle     : { start : 'rgba(240, 128, 128, 1)', end : 'rgba(255, 54, 54, .0)' }
				}
			});

			function graficarAguja() {
				$scope.gauge.setValue($scope.indicador.valorIndicador[$scope.indicador.valorIndicador.length-1].valor);
				$scope.umbrales = $scope.indicador.umbralesPorIndicador;
				
				$scope.gauge.config.minValue = $scope.umbrales[0].valorUmbralInferior;
				$scope.gauge.config.maxValue = $scope.umbrales[$scope.umbrales.length-1].valorUmbralSuperior;
				$scope.majorTicks.push($scope.umbrales[0].valorUmbralInferior);
				$scope.majorTicks.push($scope.umbrales[$scope.umbrales.length-1].valorUmbralSuperior);
				var j = 0;
				$scope.divisiones.push(0);
				for (j = 0; j<$scope.umbrales.length-1; j++){
					$scope.divisiones.push($scope.indicador.umbralesPorIndicador[j].valorUmbralSuperior);
				}
				$scope.divisiones.push($scope.indicador.umbralesPorIndicador[$scope.indicador.umbralesPorIndicador.length-1].valorUmbralSuperior);
				
				var i = 0;			
				$scope.highlight ={
						from: $scope.umbrales[0].valorUmbralInferior,
						to: $scope.umbrales[0].valorUmbralSuperior,
						color: $scope.umbrales[0].representacionCromatica
				};
				$scope.colores.push($scope.highlight);
				i = i + 1;
				for (i = 1; i<$scope.umbrales.length-1; i++){
					$scope.highlight ={
							from: $scope.umbrales[i].valorUmbralInferior,
							to: $scope.umbrales[i].valorUmbralSuperior,
							color: $scope.umbrales[i].representacionCromatica
					};
					$scope.colores.push($scope.highlight);
				}
				$scope.highlight ={
						from: $scope.umbrales[i].valorUmbralInferior,
						to: $scope.umbrales[i].valorUmbralSuperior,
						color: $scope.umbrales[i].representacionCromatica
				};
				$scope.colores.push($scope.highlight);
				
				$scope.gauge.draw();
		    };

			/***
			 * FIN FUNCIONES GRAFICO DE AGUJAS
			 ***/
		    
		});


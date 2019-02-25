angular.module('balancedScorecard')

    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider){
        $locationProvider.hashPrefix('!'); //defualt

        $routeProvider
            .when('/home', {
                template: '<tablero-page></tablero-page>'
            })
            .when('/mapa-estrategico', {
                template: '<mapa-estrategico-page></mapa-estrategico-page>'
            })
            .when('/estrategias', {
                template: '<estrategias-page></estrategias-page>'
            })
            .when('/objetivos', {
                template: '<objetivos-page></objetivos-page>'
            })
            // .when('/indicadores', {
            //     template: '<indicadores-page></indicadores-page>'
            // })
            .when('/informacion', {
                templateUrl: '../pages/informacion.html'
            })
            // .otherwise({redirectTo: $routeProvider});
            .otherwise('/home');
    }])
    .config(function(blockUIConfig){
        // Change the default overlay message
        blockUIConfig.requestFilter = function(config) {

            var message;
          
            switch(config.method) {
              case 'GET':
                message = 'Cargando...';
                break;
                
              case 'POST':
                message = 'Guardando...';
                break;
          
              case 'DELETE':
                message = 'Eliminando...';
                break;
          
              case 'PUT':
                message = 'Actualizando...';
                break;
            }
            
            return message;
            
          };
    });
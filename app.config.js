angular.module('balancedScorecard')

    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider){
        $locationProvider.hashPrefix('!'); //defualt

        $routeProvider
            .when('/tablero', {
                template: '<strategy-page></strategy-page>'
            })
            // .when('tablero/:objetivoId', {
            //     template: '<>'
            // })
            // .when('tablero/:kpiId', {
            //     template: '<>'
            // })
            .when('/mapa-estrategico', {
                template: '<div id="page-wrapper2"><h1>Mapa Estrategico</h1></div>'
            })
            .when('/estrategias', {
                template: '<estrategias-page></estrategias-page>'
            })
            .when('/objetivos', {
                template: '<objetivos-page></objetivos-page>'
            })
            .when('/indicadores', {
                template: '<div id="page-wrapper2"><h1>Indicadores</h1></div>'
            })
            .when('/ayuda', {
                template: '<div id="page-wrapper2"><h1>Ayuda</h1></div>'
            })
            // .otherwise({redirectTo: $routeProvider});
            .otherwise('/tablero');
    }]);
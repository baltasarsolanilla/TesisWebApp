angular.module('menuRouting', [
    'ngRoute'
]).

config( function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: "../pages/menu-templates/estrategia.html"
    })
    .when('/mapa-estrategico', {
        templateUrl: "../pages/menu-templates/mapa-estrategico.html"
    })
    .when('/perspectivas', {
        templateUrl: "../pages/menu-templates/perspectivas.html"
    })
    .when('/objetivos', {
        templateUrl: "../pages/menu-templates/objetivos.html"
    })
    .when('/indicadores', {
        templateUrl: "../pages/menu-templates/objetivos.html"
    })
    .when('/ayuda', {
        templateUrl: "../pages/menu-templates/objetivos.html"
    })
    // .otherwise({
        // template : "../page/menu-templates/estrategia.html"
    // });
})
angular.
  module('core.indicador').
  factory('Indicador', ['$resource',
    function($resource) {
      return $resource('http://localhost:8080/indicadores/:idIndicador', {}, {
        // query: {
        //   method: 'GET',
        //   isArray: true
        // }
      });
    }
  ]);
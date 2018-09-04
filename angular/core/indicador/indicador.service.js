angular.
  module('core.indicador').
  factory('Indicador', ['$resource',
    function($resource) {
      return $resource('localhost:8081/indicadores', {}, {
        query: {
          method: 'GET',
          isArray: true
        }
      });
    }
  ]);
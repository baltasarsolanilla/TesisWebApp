angular.
  module('core.estrategia').
  factory('Estrategia', ['$resource',
    function($resource) {
      return $resource('http://localhost:8080/estrategias/:idEstrategia', {idEstrategia: '@id'}, {
        update: {method: 'PUT'}
      });
    }
  ]);
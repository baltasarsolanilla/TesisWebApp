angular.
  module('core.objetivo').
  factory('Objetivo', ['$resource',
    function($resource) {
      return $resource('http://localhost:8080/objetivos/:idObjetivo', {}, {
        // query: {
        //   method: 'GET',
        //   isArray: true
        // }
      });
    }
  ]);
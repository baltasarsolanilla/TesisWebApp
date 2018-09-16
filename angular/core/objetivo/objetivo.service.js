angular.
  module('core.objetivo').
  factory('Objetivo', ['$resource',
    function($resource) {
      return $resource('http://localhost:8080/objetivos/:idObjetivo', {idObjetivo: '@id'}, {
          update: {method: 'PUT'},
          addIndicadorAfectante: {
            method: 'POST',
            url: 'http://localhost:8080/objetivos/:idObjetivo/indicadoresAfectantes'
          },
          deleteIndicadorAfectante: {
            method: 'PUT',
            url: 'http://localhost:8080/objetivos/:idObjetivo/indicadoresAfectantes',
          }
      });
    }
  ]);
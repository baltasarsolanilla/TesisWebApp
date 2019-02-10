angular.
  module('core.objetivo').
  factory('Objetivo', ['$resource',
    function($resource) {
      return $resource('http://localhost:8080/objetivos/:idObjetivo', {idObjetivo: '@id'}, {
          update: {
            method: 'PUT'
          },
          addIndicadorAfectante: {
            method: 'POST',
            url: 'http://localhost:8080/objetivos/:idObjetivo/indicadoresAfectantes'
          },
          deleteIndicadorAfectante: {
            method: 'PUT',
            url: 'http://localhost:8080/objetivos/:idObjetivo/indicadoresAfectantes',
          },
          addObjetivoAfectante: {
            method: 'POST',
            url: 'http://localhost:8080/objetivos/:idObjetivo/objetivosAfectantes'
          },
          deleteObjetivoAfectante: {
            method: 'PUT',
            url: 'http://localhost:8080/objetivos/:idObjetivo/objetivosAfectantes',
          },
          getHistorico: {
            method: 'GET',
            url: 'http://localhost:8080/objetivos/:idObjetivo/valoresHistoricos',
            isArray: true
          }
      });
    }
  ]);
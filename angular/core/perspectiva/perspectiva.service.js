angular.
  module('core.perspectiva').
  factory('Perspectiva', ['$resource',
    function($resource) {
      return $resource('http://localhost:8080/perspectivas/:idPerspectiva', {}, {
        addObjetivoAfectante: {
          method: 'POST',
          url: 'http://localhost:8080/perspectivas/:idPerspectiva/objetivosAfectantes'
        },
        deleteObjetivoAfectante: {
          method: 'PUT',
          url: 'http://localhost:8080/perspectivas/:idPerspectiva/objetivosAfectantes',
        },
      });
    }
  ]);
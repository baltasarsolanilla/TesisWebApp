angular.
  module('core.perspectiva').
  factory('Perspectiva', ['$resource',
    function($resource) {
      return $resource('http://localhost:8080/perspectivas/:idPerspectiva', {}, {
        // query: {
        //   method: 'GET',
        //   isArray: true
        // }
      });
    }
  ]);
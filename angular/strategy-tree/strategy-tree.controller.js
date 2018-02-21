angular.module('strategyTree').

controller('strategyTreeController', function($scope){
    $scope.my_data = [
        {
          label: 'North America',
          children: [
            {
              label: 'Canada',
              children: ['Toronto', 'Vancouver']
            }, {
              label: 'USA',
              children: ['New York', 'Los Angeles']
            }, {
              label: 'Mexico',
              children: ['Mexico City', 'Guadalajara']
            }
          ]
        }, {
          label: 'South America',
          children: [
            {
              label: 'Venezuela',
              children: ['Caracas', 'Maracaibo']
            }, {
              label: 'Brazil',
              children: ['Sao Paulo', 'Rio de Janeiro']
            }, {
              label: 'Argentina',
              children: ['Buenos Aires', 'Cordoba']
            }
          ]
        }
      ];
});
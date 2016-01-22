var app = angular.module('instagramSearchApp', ['ngRoute']);

// Configuration

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/search.html',
      controller: 'SearchCtrl'
    })
    .when('/favorites', {
      templateUrl: 'templates/favorites.html',
      controller: 'FavoritesCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}]);

// Controllers

app.controller('SearchCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.searchCtrlTest = 'search controller is working';
}]);

app.controller('FavoritesCtrl', ['$scope', function ($scope) {
  $scope.favoritesCtrlTest = 'favorite controller is working';
}]);
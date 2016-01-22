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
  $scope.searchTag = function (){
    var tag = $scope.hashtag; 
    var url = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?client_id=d8d0d6b44249490bbde6eee4d1968dac&callback=JSON_CALLBACK';

    $http.jsonp(url)
      .then(function (response) {
        $scope.hashtag = "";
        console.log (response);
        $scope.photos = response.data.data; 
      }, function (error) {
        // error callback
      });
  };
 

}]);

app.controller('FavoritesCtrl', ['$scope', function ($scope) {
  $scope.favoritesCtrlTest = 'favorite controller is working';
}]);
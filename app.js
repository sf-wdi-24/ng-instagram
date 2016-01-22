var app = angular.module('instagramSearchApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/search.html',
      controller: 'SearchCtrl'
    })
    .when('/favorites', {
      templateUrl: 'templates/favorites.html',
      controller: 'FavoritesCtrl'
    });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}]);

app.controller('SearchCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.searchCtrlTest = "Hey it's working!";
  $scope.searchTag = function() {
    var tag = $scope.tag;
    var url = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?client_id=d8d0d6b44249490bbde6eee4d1968dac&callback=JSON_CALLBACK';

    $http.jsonp(url)
      .then(function (response) {
        $scope.searchTag = {};
        $scope.photos = response.data.data;
        console.log($scope.photos);
      }, function (error) {

      });
  };
  $scope.savePhoto = function(photo) {
    console.log(photo);
  };
}]);

app.controller('FavoritesCtrl', ['$scope', function($scope){
	$scope.favoritesCtrlTest = "Hey this is working too!";
}]);
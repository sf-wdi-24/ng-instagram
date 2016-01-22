var app = angular.module('hashTagApp', ['ngRoute', 'ngResource']);

var parseRequestHeaders = {
  'X-Parse-Application-Id': '6NzhrhqvlJkIQQFyvpIuQ0RtwLDckwQGamzd9R7S',
  'X-Parse-REST-API-Key': 'sptJhGuZqNcvVGKjLmfklGoMrz7nDWMgPuxKK5zr'
};

// Photo resource

app.factory('Photo', ['$resource', function ($resource) {
  return $resource('https://api.parse.com/1/classes/Photo/:photoId', { photoId: '@photoId' },
    {
      query: {
        method: 'GET',
        isArray: false,
        headers: parseRequestHeaders
      },
      save: {
        method: 'POST',
        headers: parseRequestHeaders
      }
    });
}]);

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

app.controller('SearchCtrl', ['$scope', '$http', 'Photo', function ($scope, $http, Photo) {
  $scope.searchCtrlTest = 'search controller is working';

  $scope.searchTag = function () {
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
 
  $scope.savePhoto = function (photo) {
    var photoData = {
      url: photo.images.standard_resolution.url,
      user: photo.user.username,
      likes: photo.likes.count
    };

    Photo.save(photoData, 
      function(data) {
        // Success callback

      }, 
      function(error) {
        // Error callback

      }
    );
  };
}]);

app.controller('FavoritesCtrl', ['$scope', 'Photo', function ($scope, Photo) {
  $scope.favorites = [];

  Photo.query(
    function (data) {
      // success callback
      console.log(data.results);
      $scope.favorites = data.results;
    }, 
    function (error) {
      // error callback
    });
}]);













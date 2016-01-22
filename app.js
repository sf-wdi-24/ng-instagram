var app = angular.module('instagramSearchApp', ['ngRoute', 'ngResource']);

var parseRequestHeaders = {
  'X-Parse-Application-Id': '9KdsHrz9QEEdM5Gz5GAuuHtdrjExO11sOvwMRnp5',
  'X-Parse-REST-API-Key': 'zf0y9sW2W9Z9f5w1V8X8igrahIKfBVPJIcVwN7ys'
};

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
  
    // $resource function exposes all five RESTful methods/routes
    // { 'get'   : { method: 'GET'                },
    //   'save'  : { method: 'POST'               },
    //   'query' : { method: 'GET', isArray: true },
    //   'remove': { method: 'DELETE'             },
    //   'delete': { method: 'DELETE'             } };
}]);

app.controller('SearchCtrl', ['$scope', '$http', 'Photo', function ($scope, $http, Photo) {
  $scope.photos = [];

  $scope.searchTag = function () {
    var tag = $scope.tag.replace(/\s+/, '');
    var url = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?client_id=d8d0d6b44249490bbde6eee4d1968dac&callback=JSON_CALLBACK';
    
    $http.jsonp(url)
      .then(function (response) {
        // success callback
        $scope.tag = '';
        $scope.photos = response.data.data;
      }, function (error) {
        // error callback
      });
  };

  $scope.savePhoto = function (photo) {
    photo.favorited = true;
    
    var photoData = {
      url: photo.images.standard_resolution.url,
      user: photo.user.username,
      likes: photo.likes.count
    };

    Photo.save(photoData, function (data) {
      // success callback
    }, function (error) {
      // error callback
    });

    // or without callbacks:
    // Photo.save(photoData);
  };
}]);

app.controller('FavoritesCtrl', ['$scope', 'Photo', function ($scope, Photo) {
  $scope.favorites = [];

  Photo.query(function (data) {
    // success callback
    $scope.favorites = data.results;
  }, function (error) {
    // error callback
  });
}]);
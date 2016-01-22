var app = angular.module('instagramSearchApp', ['ngRoute', 'ngResource']);

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
  return $resource('/api/photos/:id', { id: '@_id' });
  
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

    // or using $http:
    // $http.post('/api/photos', photoData)
    //   .then(function (response) {
    //     // success callback
    //   }, function (error) {
    //     // error callback
    //   });
  };
}]);

app.controller('FavoritesCtrl', ['$scope', '$http', 'Photo', function ($scope, $http, Photo) {
  $scope.favorites = [];

  Photo.query(function (data) {
    // success callback
    $scope.favorites = data;
  }, function (data) {
    // error callback
  });

  // or without callbacks:
  // $scope.favorites = Photo.query();

  // or using $http:
  // $http.get('/api/photos')
  //   .then(function (response) {
  //     // success callback
  //     $scope.favorites = response.data;
  //   }, function (error) {
  //     // error callback
  //   });
}]);
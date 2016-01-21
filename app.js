var app = angular.module('instagramSearchApp', ['ngRoute']);

app.run(function() {
  Parse.initialize('9KdsHrz9QEEdM5Gz5GAuuHtdrjExO11sOvwMRnp5', 'UiPpuXT7RbjuY2wWLJt6jqOblBgGhDZNIOZrkvmL');
});

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

app.controller('SearchCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.photos = [];

  $scope.searchTag = function () {
    var tag = $scope.tag.replace(/\s+/, '');
    var url = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?client_id=d8d0d6b44249490bbde6eee4d1968dac&callback=JSON_CALLBACK';
    $http.jsonp(url)
      .then(function (response) {
        $scope.tag = '';
        $scope.photos = response.data.data;
      });
  };

  $scope.savePhoto = function (photo) {
    var Photo = Parse.Object.extend("Photo");
    var newPhoto = new Photo({
      url: photo.images.standard_resolution.url,
      user: photo.user.username,
      likes: photo.likes.count
    });
    newPhoto.save()
      .then(function (data) {
        console.log(data);
      });
  };
}]);

app.controller('FavoritesCtrl', ['$scope', function ($scope) {
  $scope.favorites = [];
  var Photo = Parse.Object.extend("Photo");
  var query = new Parse.Query(Photo);
  query.find({
    success: function (results) {
      for (var i = 0; i < results.length; i++) {
        var object = results[i];
        $scope.favorites.push(object.get('url'));
      }
      console.log($scope.favorites);
    }
  });
}]);
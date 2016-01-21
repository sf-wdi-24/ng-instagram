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
    var Photo = Parse.Object.extend('Photo');
    var newPhoto = new Photo({
      url: photo.images.standard_resolution.url,
      user: photo.user.username,
      likes: photo.likes.count
    });

    // save without error-handling:
    // newPhoto.save()

    // save with error-handling:
    newPhoto.save()
      .then(function (data) {
        // success callback
      }, function (error) {
      	// error callback
      });
  };
}]);

app.controller('FavoritesCtrl', ['$scope', '$q', function ($scope, $q) {
	var PhotoDfd = $q.defer();
	var Photo = Parse.Object.extend('Photo');
	var query = new Parse.Query(Photo);
	$scope.favorites = [];

	query.find()
		.then(function (data) {
			// success callback
			PhotoDfd.resolve(data);
		}, function (error) {
			// error callback
			PhotoDfd.reject(data);
		});

	PhotoDfd.promise
		.then(function (data) {
			// success callback
			var favoritePhotos = data;
			$scope.favorites = favoritePhotos.map(function (photo) {
				return {
					url: photo.get('url'),
					user: photo.get('user'),
					likes: photo.get('likes')
				};
			});
		})
		.catch(function (error) {
			// error callback
		});
}]);
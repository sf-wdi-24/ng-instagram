# <img src="https://cloud.githubusercontent.com/assets/7833470/10899314/63829980-8188-11e5-8cdd-4ded5bcb6e36.png" height="60"> ngInstagram Lab

**Objective:** Use Angular to create two versions of an Instagram search engine, one with a Parse back-end, and one with MEAN Stack.

**You should be pair programming the entire time you work on this lab. That means you're using ONE computer at a time, and ONLY the "driver" is allowed to type.**

## Set Up

1. Whoever is going to be the "driver" first should fork this repo, and clone it into their `develop` folder on their local machine. The "navigator" must close their computer.

2. Once you're in your app directory, run `budo app.js --open --pushstate` to open your app in the browser. You should see a blank page.

3. The first thing you should do is require `ngRoute` in your app:
  * Add the `ngRoute` CDN to `index.html`.
  * Add `<div ng-view></div>` somewhere inside the `<body></body>` in `index.html`.
  * Add `ngRoute` to your Angular app's dependencies in `app.js`.

4. Now you're ready to configure your routes! Place this code in `app.js` (and fill in the blanks):

  ```js
  /*
   * app.js
   */

  app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '',
        controller: 'SearchCtrl'
      })
      .when('/favorites', {
        templateUrl: '',
        controller: ''
      });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }]);
  ```

5. Also in `app.js`, create two Angular controllers to match the routes you have set up. You should add test attributes to `$scope` in each controller to make sure the routes, templates, and controllers are all connected.

  ```js
  /*
   * app.js
   */

   app.controller('SearchCtrl', ['$scope', '$http', function ($scope) {
     // add a test attribute to `$scope` here
   }]);

   app.controller('FavoritesCtrl', ['$scope', function ($scope) {
     // add a test attribute to `$scope` here
   }]);
  ```

  At this point, when you navigate to `/` and `/favorites`, you should see two lines of test messages in both views.

6. Add a Bootstrap nav to `index.html` (your layout file) with links to "Search" (`/`) and "Favorites" (`/favorites`) so you can easily navigate your site.

## Instagram Search

1. At this point, the "driver" should add, commit, and push their changes to GitHub. The "driver" should also add the "navigator" as a collaborator on their forked version of the repo. It's time to switch drivers! The new driver should clone their partners forked version of the repo into their `develop` folder. The new navigator must close their computer.

2. Since you're going to be implementing an Instagram search engine, you need an API key from Instagram. Go to <a href="https://www.instagram.com/developer">instagram.com/developer</a> and log in with your Instagram account (or create an account if you don't already have one).

3. On the Instagram developer dashboard, click "Manage Clients" on the nav, then "Register a New Client" (green button near the top). Fill out the information; not all the fields are required, so it's ok to give minimal information (if the "Website URL" is required, it should let you use `http://localhost:3000`).

4. Once you've created your new app with Instagram, leave the developer dashboard open - you'll need the "Client ID" very soon.

5. Back in your app, create a form in `search.html` for the user to search Instagram tags. The form should only have one field so the user can type in the tag to search.
  * Remember to use `ng-model` on the form input field to bind the value the user types to `$scope`.
  * Use `ng-submit` to listen for form submissions. When the user submits the form, `ng-submit` should call a function `searchTag` (which does not exist yet - that's the next step!).

6. In `app.js`, define a function `$scope.searchTag` in the `SearchCtrl`. When `searchTag` is called, make sure you can access the value the user typed in the form (using `$scope` and the value of `ng-model`). Save it to a variable called `tag`.

7. Once you've gotten the tag
from the form, set up the following `$http` request to the Instagram API (remember to include `$http` in the controller's list of dependencies):

  ```js
  var url = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?client_id=YOUR_INSTAGRAM_CLIENT_ID&callback=JSON_CALLBACK';

  $http.jsonp(url)
    .then(function (response) {
      // success callback
    }, function (error) {
      // error callback
    });
  ```

  Note that you have to use `JSONP` to call the Instagram API from the client-side to bypass rules about Cross-Origin Requests.

8. Inside the success callback, you should clear the value from the form (using `$scope` and the value of `ng-model`).

9. Add a new attribute to `$scope`, `$scope.photos`, which should equal the array of photos that comes back from the Instagram API. You'll need to look at the API response in the Chrome developer console to inspect the structure of the `response` object from Instagram.

10. When you've got `$scope.photos` working, `ng-repeat` over the photos in the "Search". You should display at least the image URL, the username of the user who posted the photo, and the number of "likes" the photo got. The photo objects that come back from Instagram have attributes nested several levels deep, so spend some time inspecting the structure of the data.

11. Use the `ng-pluralize` directive to display the number of "likes" for each photo (e.g. "1 like", "2 likes").

12. Make sure your page layout looks good. Bootstrap's `.thumbnail` class could be helpful :)

## Favorites with Parse

1. The current driver should add, commit, and push their changes to GitHub. Time to switch drivers again! The new driver should pull down the changes from GitHub.

2. Inside the `ng-repeat` for photos, add a link to "favorite" each photo. Use `ng-click` to listen for clicks on the "favorite" links. When a user clicks "favorite", `ng-click` should call a function `savePhoto` that takes in the photo as a param.

3. In `app.js`, define a function `$scope.savePhoto` in the `SearchCtrl`. When `savePhoto` is called, simply `console.log` the photo.

4. It would be nice if you could save the "favorited" photos somewhere, so the next step is to set up your app to use Parse! First, **checkout a new branch called `parse`**.

5. Add the Parse CDN to `index.html`. You'll also be using `ngResource` to interact with Parse, so add that CDN as well. Your JavaScript CDNs should be in this order:

  ```html
  <!-- index.html -->

  <head>
    ...

    <!-- parse -->
    <script type="text/javascript" src="http://www.parsecdn.com/js/parse-1.6.14.min.js"></script>

    <!-- angular -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.8/angular.min.js"></script>

    <!-- ngRoute -->
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-route.min.js"></script>

    <!-- ngResource -->
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-resource.min.js"></script>

    <!-- custom script (angular app) -->
    <script type="text/javascript" src="app.js"></script>
  </head>
  ```

6. If you haven't signed up for Parse yet, go ahead and sign up and create a new app. When signing up, select the "Data" product and the "Web" environment. Then create your app and go to the app dashboard. This is where you'll see all your data.

7. In your Angular app, set Request Headers for Parse to send your API keys with every request. This should be a global variable outside any existing config or controllers.

  ```js
  var parseRequestHeaders = {
    'X-Parse-Application-Id': 'YOUR_PARSE_APPLICATION_ID',
    'X-Parse-REST-API-Key': 'YOUR_PARSE_REST_API_KEY'
  };
  ```

  You can find your Application Id and REST API Key in your app's dashboard under "App Settings" > "Security & Keys" (on the left sidebar).

8. Next you're going to set up a `Photo` resource to interact with Parse. Make sure to add `ngResource` to your Angular app's list of dependencies.

9. Define the `Photo` resource:

  ```js
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
  ```

  * Calling the `Photo.query` method will send a `GET` request to `https://api.parse.com/1/classes/Photo` (to get all the photos in the collection).
  * Calling the `Photo.save` method will send a `POST` request to `https://api.parse.com/1/classes/Photo` (to add a new photo to the collection).

10. In the `SearchCtrl`, implement your `savePhoto` function so that it calls the `Photo.save` method:

  ```js
  $scope.savePhoto = function (photo) {
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
  ```

11. Now when the user clicks the "favorite" link on any photo, the photo should save to your `Photo` collection in parse. Check your Parse dashboard to see if it's working!

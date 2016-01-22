# <img src="https://cloud.githubusercontent.com/assets/7833470/10899314/63829980-8188-11e5-8cdd-4ded5bcb6e36.png" height="60"> ngInstagram Lab

**Objective:** Use Angular to create two versions of an Instagram search engine, one with a Parse back-end, and one with MEAN Stack.

**You should be pair programming the entire time you work on this lab. That means you're using ONE computer at a time, and ONLY the "driver" is allowed to type (you'll switch roles throughout the lab).**

## Setup

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

1. At this point, the "driver" should add, commit, and push their changes to GitHub. The "driver" should also add the "navigator" as a collaborator on their forked version of the repo. It's time to switch drivers! The new driver should clone their partner's forked version of the repo into their `develop` folder. The new navigator must close their computer.

2. Since you're going to be implementing an Instagram search engine, you need an API key from Instagram. Go to <a href="https://www.instagram.com/developer" target="_blank">instagram.com/developer</a>, and log in with your Instagram account (or create an account if you don't already have one).

3. On the Instagram developer dashboard, click "Manage Clients" on the nav, then "Register a New Client" (green button near the top). Fill out the information; not all the fields are required, so it's ok to give minimal information (if the "Website URL" is required, it should let you use `http://localhost:3000`).

4. Once you've created your new app with Instagram, leave the developer dashboard open - you'll need the "Client ID" very soon.

5. Back in your app, create a form in `search.html` for the user to search Instagram tags. The form should only have one field so the user can type in the tag to search.
  * Remember to use `ng-model` on the form input field to bind the value the user types to `$scope`.
  * Use `ng-submit` to listen for form submissions. When the user submits the form, `ng-submit` should call a function `searchTag` (which does not exist yet - that's the next step!).

6. In `app.js`, define a function `$scope.searchTag` in the `SearchCtrl`. When `searchTag` is called, make sure you can access the value the user typed in the form (using `$scope` and the value of `ng-model`). Save it to a variable called `tag`.

7. Once you've gotten the tag
from the form, set up the following `$http` request to the Instagram API (remember to include `$http` in the controller's list of dependencies):

  ```js
  /*
   * app.js
   */

  app.controller('SearchCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.searchTag = function () {
      var tag = $scope.tag;
      var url = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?client_id=YOUR_INSTAGRAM_CLIENT_ID&callback=JSON_CALLBACK';

      $http.jsonp(url)
        .then(function (response) {
          // success callback
        }, function (error) {
          // error callback
        });
    };
  }]);
  ```

  Note that you have to use `JSONP` to call the Instagram API from the client-side to bypass rules about Cross-Origin Requests.

8. Inside the success callback, you should clear the value of the form input field (using `$scope` and the value of `ng-model`).

9. Also inside the success callback, add a new attribute to `$scope`, `$scope.photos`, which should equal the array of photos that comes back from the Instagram API. You'll need to look at the API response in the Chrome developer console to inspect the structure of the `response` object from Instagram.

10. Once you have `$scope.photos` working, `ng-repeat` over the photos in the "Search" view. You should display at least:
  * the image URL.
  * the username of the user who posted the photo.
  * the number of "likes" the photo got.

11. Use the `ng-pluralize` directive to display the number of "likes" for each photo (e.g. "1 like", "2 likes").

12. Make sure your page layout looks good. Bootstrap's `.thumbnail` class could be helpful :)

## Favorites with Parse

1. The current driver should add, commit, and push their changes to GitHub. Time to switch drivers again! The new driver should pull down the changes from GitHub.

2. Inside the `ng-repeat` for photos, add a link to "favorite" each photo. Use `ng-click` to listen for clicks on the "favorite" links. When a user clicks "favorite", `ng-click` should call a function `savePhoto` that takes in the photo as a param.

3. In `app.js`, define a function `$scope.savePhoto` in the `SearchCtrl`. When `savePhoto` is called, simply `console.log` the photo.

4. It would be nice if you could save the "favorited" photos somewhere, so the next step is to set up your app to use Parse! **First, checkout a new branch called `parse`.**

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
  /*
   * app.js
   */

  var parseRequestHeaders = {
    'X-Parse-Application-Id': 'YOUR_PARSE_APPLICATION_ID',
    'X-Parse-REST-API-Key': 'YOUR_PARSE_REST_API_KEY'
  };
  ```

  You can find your Application Id and REST API Key in your app's dashboard under "App Settings" > "Security & Keys" (on the left sidebar).

8. Next you're going to set up a `Photo` resource to interact with Parse. Make sure to add `ngResource` to your Angular app's list of dependencies.

9. Define the `Photo` resource:

  ```js
  /*
   * app.js
   */

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

10. Add `Photo` to `SearchCtrl`'s list of dependencies. In the `SearchCtrl`, implement your `savePhoto` function so that it calls the `Photo.save` method:

  ```js
  /*
   * app.js
   */

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

12. Add `Photo` to `FavoritesCtrl`'s list of dependencies. To get the favorite photos to display, call the `Photo.query` method in the `FavoritesCtrl`:

  ```js
  /*
   * app.js
   */

  app.controller('FavoritesCtrl', ['$scope', 'Photo', function ($scope, Photo) {
    $scope.favorites = [];

    Photo.query(function (data) {
      // success callback
      $scope.favorites = data.results;
    }, function (error) {
      // error callback
    });
  }]);
  ```

13. In `favorites.html`, `ng-repeat` over `favorites` to display the favorite photos in the view.

## Favorites with MEAN Stack

1. The current driver should add, commit, and push their changes to GitHub. The new driver should pull down the changes from GitHub. **From the `master` branch, create a new branch called `mean`.**

2. As an alternative to Parse, you're going to implement the same "favoriting" functionality for photos, but this time by building your own server with Mongo, Express, and Node. From your app's root directory, create a new file `server.js`, and run `npm init` in the Terminal.

3. Install your Node modules:

  ```zsh
  ➜  npm install --save express body-parser hbs mongoose
  ```

  Now would be a good time to create a `.gitignore` file and ignore your `node_modules`.

4. Set up your Express boilerplate in `server.js`:

  ```js
  /*
   * server.js
   */

   // require express and other modules
   var express = require('express'),
       app = express(),
       bodyParser = require('body-parser'),
       mongoose = require('mongoose');

   // configure bodyParser (for receiving form data)
   app.use(bodyParser.urlencoded({ extended: true }));
   app.use(bodyParser.json());

   // serve static files from public folder
   app.use(express.static(__dirname + '/public'));

   // set view engine to hbs (handlebars)
   app.set('view engine', 'hbs');

   // connect to mongodb
   mongoose.connect('mongodb://localhost/ng_instagram');

   // listen on port 3000
   app.listen(3000, function() {
     console.log('server started');
   });
  ```

5. You'll need to reorganize your file structure a bit:

  ```zsh
  ➜  mkdir views
  ➜  mv index.html views/index.hbs
  ➜  mkdir public
  ➜  mkdir public/scripts
  ➜  mv app.js public/scripts/app.js
  ➜  mv templates public/templates
  ```

6. Open up `index.hbs`, and change the path to require `app.js` (since it's nested under `scripts` now):

  ```html
  <!-- index.hbs -->

  <head>
    ...

    <!-- custom script (angular app) -->
    <script type="text/javascript" src="scripts/app.js"></script>
  </head>
  ```

7. In `server.js`, you'll need a "catch all" route to render `index.hbs` for every server request:

  ```js
  /*
   * server.js
   */

  /*
   * Load `views/index.hbs` file
   * when any route is requested from the server
   */

  app.get('*', function (req, res) {
    res.render('index');
  });
  ```

8. At this point, you should fire up your server with `nodemon` (you'll also want to have `mongod` running in another tab), and check that it doesn't crash. Also open up `localhost:3000` in the browser, and make sure your Angular app is still working. You should be able to search photos from Instagram, click the "favorite" link on a photo and see a `console.log`, and navigate to the "Favorites" view.

9. Once everything is connected, your next goal is to set up API routes for photos. You'll want a route to save a new photo to the database and a route to get all the photos from the database. First, make a models folder and a `Photo` model:

  ```zsh
  ➜  mkdir models
  ➜  touch models/photo.js
  ```

10. Inside `photo.js`, set up your Mongoose model:

  ```js
  /*
   * photo.js
   */

  var mongoose = require('mongoose'),
      Schema = mongoose.Schema;

  var PhotoSchema = new Schema({
    url: String,
    user: String,
    likes: Number
  });

  var Photo = mongoose.model('Photo', PhotoSchema);
  module.exports = Photo;
  ```

11. Require your `Photo` model in `server.js`:

  ```js
  /*
   * server.js
   */

  // require Photo model
  var Photo = require('./models/photo');
  ```

12. Set up API routes for getting all photos and saving a new photo to the database (fill in the blanks):

  ```js
  /*
   * server.js
   */

  // get all photos
  app.get('/api/photos', function (req, res) {
    // find all photos in db
  });

  // create new photo
  app.post('/api/photos', function (req, res) {
    // create new photo with form data (`req.body`)

    // save new photo in db
  });
  ```

  Once you have your API routes set up, test them on Postman before continuing.

13. Switching to the client-side, you're going to make a similar `Photo` resource to the one you set up with Parse, but this time, the API endpoints will be on your own server. First, make sure to include the `ngResource` CDN in `index.hbs`, and add `ngResource` to your Angular app's dependencies in `app.js`.

14. Define the `Photo` resource:

  ```js
  /*
   * app.js
   */

  app.factory('Photo', ['$resource', function ($resource) {
    return $resource('/api/photos/:id', { id: '@_id' });
  }]);
  ```

  * Since there is no need to set Request Headers when sending requests to your own server, the `Photo` resource is much simpler this time, taking advantage of the pre-baked defaults.
  * Calling the `Photo.query` method will send a `GET` request to `localhost:3000/api/photos` (to get all the photos from the database).
  * Calling the `Photo.save` method will send a `POST` request to `localhost:3000/api/photos` (to add a new photo to the database).

15. Add `Photo` to `SearchCtrl`'s list of dependencies. In the `SearchCtrl`, implement your `savePhoto` function so that it calls the `Photo.save` method:

  ```js
  /*
   * app.js
   */

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

    // or using $http:
    // $http.post('/api/photos', photoData)
    //   .then(function (response) {
    //     // success callback
    //   }, function (error) {
    //     // error callback
    //   });
  };
  ```

16. Now when the user clicks the "favorite" link on any photo, the photo should save to the `photos` collection in your Mongo database. You can check your `mongo` CLI in the Terminal to see if it's working.

17. Add `Photo` to `FavoritesCtrl`'s list of dependencies. To get the favorite photos to display, call the `Photo.query` method in the `FavoritesCtrl`:

  ```js
  /*
   * app.js
   */

  app.controller('FavoritesCtrl', ['$scope', '$http', 'Photo', function ($scope, '$http', Photo) {
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
  ```

18. In `favorites.html`, `ng-repeat` over `favorites` to display the favorite photos in the view.

### Congrats, you've now created two fully functional Angular applications with different back-ends!!!

![giphy](https://cloud.githubusercontent.com/assets/7833470/12503593/6d245dac-c08a-11e5-9850-8427cc639d32.gif)

## Solutions

* [Base Solution](https://github.com/sf-wdi-24/ng-instagram/tree/solution) (Instagram Search)
* [Favorites with Parse](https://github.com/sf-wdi-24/ng-instagram/tree/solution_parse)
* [Favorites with MEAN Stack](https://github.com/sf-wdi-24/ng-instagram/tree/solution_mean)
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('MDApp', ['ionic'])

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'views/tabs/tabs.html'
    }).state('tabs.home', {
      url: '/home',
      views: {
        'home-tab': {
          templateUrl: 'views/home/home.html',
          controller: 'HomeCtrl'
        }
      }
    }).state('tabs.camera', {
      url: '/camera',
      views: {
        'camera-tab': {
          templateUrl: 'views/camera/index.html',
          controller: 'CameraCtrl'
        }
      }
    }).state('tabs.analysis', {
      url: '/analysis',
      views: {
        'analysis-tab': {
          templateUrl: 'views/analysis/index.html',
          controller: 'AnalysisCtrl'
        }
      }

    }).state('tabs.archive', {
      url: '/archive',
      views: {
        'archive-tab': {
          templateUrl: 'views/archive/index.html',
          controller: 'ArchiveCtrl'
        }
      }

    });

    $urlRouterProvider.otherwise("/tab/home");
  })

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);


      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .controller('HomeCtrl', function ($scope) {
    console.log('Home');
  })

  .controller('CameraCtrl', function ($scope) {
    console.log('CameraCtrl');

    if (window.StatusBar) {


    }

    $scope.startCamera = function () {

      var tapEnabled = true; //enable tap take picture
      var dragEnabled = true; //enable preview box drag across the screen
      var toBack = false; //send preview box to the back of the webview
      var rect = {x: 100, y: 100, width: 200, height: 200};

      cordova.plugins.camerapreview.startCamera(rect, "front", tapEnabled, dragEnabled, toBack);
    }

    $scope.showCamera = function () {
      cordova.plugins.camerapreview.show();
    }

  })

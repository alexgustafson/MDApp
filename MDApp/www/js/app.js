// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('MDApp.controllers', []);

var app = angular.module('MDApp',
  ['ionic', 'ngCordova', 'MDApp.data.services', 'MDApp.image.services', 'MDApp.controllers'])

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
      cache: false,
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

    }).state('tabs.archive_detail', {
      url: '/archive/:archiveID',
      views: {
        'archive-tab': {
          templateUrl: 'views/archive/detail.html',
          controller: 'ArchiveCtrl'
        }
      }

    });

    $urlRouterProvider.otherwise("/tab/home");
  })

  .run(function ($ionicPlatform, MDDataService, MDAppState) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);

        MDDataService.initializeDB();
        MDAppState.initialize();

      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })


  .controller('ApplicationCtrl', function ($scope, $rootScope) {
    $rootScope.host = 'http://mdserver.offshore.webfactional.com';
    console.log('Main');

    $scope.disableUI = false;

    $scope.tabStates = {
      home: true,
      camera: true,
      analysis: false,
      archive: false
    };

    $scope.shouldDisable = function (tab) {
      if ($scope.disableUI) {
        return true;
      }

      return false;
    }
  })


  .controller('HomeCtrl', function ($scope) {
    console.log('Home');
  })







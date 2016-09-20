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

  .controller('MainCtrl', function ($scope) {
    console.log('Main');
    $scope.capturedImage = {};
    $scope.previewImage = {};

  })

  .controller('HomeCtrl', function ($scope) {
    console.log('Home');
    $scope.$on("$ionicView.afterEnter", function (event, data) {

      $('html, body, ion-tabs, ion-nav-view, .pane').css({'background-color': 'rgba(255, 255, 255, 0.98)'});

    });


    $scope.$on("$ionicView.beforeLeave", function (event, data) {

      $('html, body, ion-tabs, ion-nav-view, .pane').css({'background-color': 'rgba(34, 34, 34, 0.1)'});

    });


  })

  .controller('CameraCtrl', function ($scope, $timeout, $rootScope) {
    console.log('CameraCtrl');

    $scope.captureImage = function() {
      cordova.plugins.camerapreview.takePicture();
    }

    cordova.plugins.camerapreview.setOnPictureTakenHandler(function(result){
      console.log('Image Captured');
      console.log(result[0]);
      $rootScope.capturedImage = result[0];//originalPicturePath;
      $rootScope.previewImage = result[1];//previewPicturePath;
    });


    $scope.$on("$ionicView.beforeEnter", function (event, data) {

      $('html, body, ion-tabs, ion-nav-view, .pane').css({'background-color': 'rgba(34, 34, 34, 0.02)'});

    });

    $scope.$on("$ionicView.afterEnter", function (event, data) {

      $('html, body, ion-tabs, ion-nav-view, .pane').css({'background-color': 'rgba(34, 34, 34, 0.01)'});

      var tapEnabled = true; //enable tap take picture
      var dragEnabled = false; //enable preview box drag across the screen
      var toBack = true; //send preview box to the back of the webview
      var rect = {x: 0, y: 34, width: 340, height: 400};
      // handle event
      console.log("State Params: ", data.stateParams);
      cordova.plugins.camerapreview.startCamera(rect, "back", tapEnabled, dragEnabled, toBack);
      cordova.plugins.camerapreview.show();


      $timeout(function () {
        $('html, body, ion-tabs, ion-nav-view, .pane').css({'background-color': 'rgba(255, 255, 255, 0.05)'});
      }, 500)

    });

    $scope.$on("$ionicView.afterLeave", function (event, data) {
      // handle event
      console.log("State Params: ", data.stateParams);
      cordova.plugins.camerapreview.hide();
      cordova.plugins.camerapreview.stopCamera();
      $('html, body, ion-tabs, ion-nav-view, .pane').css({'background-color': 'rgba(255, 255, 255, 0.92)'});

    });

  })

  .controller('ArchiveCtrl', function ($scope) {
    console.log('Archive');
    $scope.$on("$ionicView.beforeEnter", function (event, data) {
      $('html, body, ion-tabs, ion-nav-view, .pane').css({'background-color': 'rgba(255, 255, 255, 0.98)'});
    });


    $scope.$on("$ionicView.beforeLeave", function (event, data) {
      $('html, body, ion-tabs, ion-nav-view, .pane').css({'background-color': 'rgba(34, 34, 34, 0.1)'});
    });

  })

  .controller('AnalysisCtrl', function ($scope, $rootScope) {

    console.log('Archive');

    $scope.displayImage = $rootScope.previewImage;

    $scope.$on("$ionicView.afterEnter", function (event, data) {
      $('html, body, ion-tabs, ion-nav-view, .pane').css({'background-color': 'rgba(255, 255, 255, 0.98)'});
      document.getElementById('capturedImage').src = $scope.displayImage.replace("assets-library://", "cdvfile://localhost/assets-library/");
    });

    $scope.$on("$ionicView.afterLeave", function (event, data) {
      $('html, body, ion-tabs, ion-nav-view, .pane').css({'background-color': 'rgba(34, 34, 34, 0.1)'});
    });

  })

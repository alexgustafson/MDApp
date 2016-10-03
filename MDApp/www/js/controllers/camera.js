angular.module('MDApp.controllers')

  .controller('CameraViewCtrl', function ($scope, $timeout, $rootScope, MDAppState, MDLesionImage, MDBorderService) {
    console.log('CameraCtrl');


    $scope.captureImage = function () {
      if ($scope.$parent.disableUI) {
        return;
      }
      $scope.$emit('disableUI', true);
      $scope.disableUI = true;
      cordova.plugins.camerapreview.takePicture();
    }

    cordova.plugins.camerapreview.setOnPictureTakenHandler(function (result) {
      // only ios
      var path = result[0].replace("assets-library://", "cdvfile://localhost/assets-library/");

      $rootScope.capturedImage = path;//originalPicturePath;
      $rootScope.previewImage = path;
      $rootScope.capturedImage = path;

      $rootScope.activeImage = MDLesionImage.newImage(path);

      MDBorderService.getBorder(result[0]).then(function (response) {

        $rootScope.activeImage.originalImagePath = response.original;
        $rootScope.activeImage.borderImagePath = response.border;
        $rootScope.activeImage.key = response.key;

        MDAppState.ActiveImageKey.valueStr = response.key;
        MDAppState.save();

        $scope.disableUI = false;

        $scope.$emit('disableUI', false);
        $scope.$emit('hasBorder');

      });

    });


    $scope.$on("$ionicView.afterEnter", function (event, data) {

      var tapEnabled = false; //enable tap take picture
      var dragEnabled = false; //enable preview box drag across the screen
      var toBack = true; //send preview box to the back of the webview
      var rect = {x: 0, y: 34, width: 340, height: 400};

      cordova.plugins.camerapreview.startCamera(rect, "back", tapEnabled, dragEnabled, toBack);
      cordova.plugins.camerapreview.show();

      $timeout(function () {
        $('html, body, ion-tabs, ion-nav-view, .pane').css({'background-color': 'rgba(255, 255, 255, 0.01)'});
      }, 200)

    });

    $scope.$on("$ionicView.afterLeave", function (event, data) {
      // handle event
      cordova.plugins.camerapreview.hide();
      cordova.plugins.camerapreview.stopCamera();
      $('html, body, ion-tabs, ion-nav-view, .pane').css({'background-color': 'rgba(255, 255, 255, 0.92)'});
    });

  });
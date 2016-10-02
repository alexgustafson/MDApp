angular.module('MDApp.controllers')

  .controller('CameraCtrl', function ($scope, $timeout, $rootScope, MDLesionImage, MDBorderService, $sce, $state) {
    console.log('CameraCtrl');


    $scope.captureImage = function () {
      if ($scope.$parent.disableUI) {
        return;
      }
      $scope.$parent.tabStates.home = false;
      $scope.$parent.tabStates.analysis = false;
      $scope.$parent.tabStates.camera = true;
      $scope.$parent.tabStates.archive = false;
      $scope.$parent.disableUI = true;
      $scope.disableUI = true;
      console.log('capture activated');
      cordova.plugins.camerapreview.takePicture();
    }

    cordova.plugins.camerapreview.setOnPictureTakenHandler(function (result) {

      $rootScope.capturedImage = result[0];//originalPicturePath;
      $rootScope.previewImage = $rootScope.capturedImage;
      $rootScope.capturedImage = $rootScope.capturedImage.replace("assets-library://", "cdvfile://localhost/assets-library/");

      $rootScope.activeImage = MDLesionImage.newImage(result[0]);

      MDBorderService.getBorder(result[0]).then(function (response) {

        $rootScope.activeImage.borderImagePath = response.border;
        $rootScope.activeImage.key = response.key;

        $scope.$parent.disableUI = false;
        $scope.disableUI = false;
        $scope.$parent.tabStates.home = true;
        $scope.$parent.tabStates.analysis = true;
        $scope.$parent.tabStates.camera = true;
        $scope.$parent.tabStates.archive = false;

        $state.go('tabs.analysis');

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
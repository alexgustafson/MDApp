angular.module('MDApp.controllers')

  .controller('CameraCtrl', function ($scope, $timeout, $rootScope, MDLesionImage, MDBorderService, $sce) {
    console.log('CameraCtrl');

    $scope.captureImage = function() {
      console.log('capture activated');
      cordova.plugins.camerapreview.takePicture();
    }

    cordova.plugins.camerapreview.setOnPictureTakenHandler(function(result){

      $rootScope.capturedImage = result[0];//originalPicturePath;
      $rootScope.previewImage = $rootScope.capturedImage;
      $rootScope.capturedImage = $rootScope.capturedImage.replace("assets-library://", "cdvfile://localhost/assets-library/");

      MDLesionImage.newImage(result[0]).then(function(result){
        console.log(result);
      });

      MDBorderService.getBorder(result[0]).then(function(response) {
        $rootScope.image_analysis = response;
      });

    });



    $scope.$on("$ionicView.afterEnter", function (event, data) {

      $('html, body, ion-tabs, ion-nav-view, .pane').css({'background-color': 'rgba(34, 34, 34, 0.01)'});

      var tapEnabled = false; //enable tap take picture
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

  });
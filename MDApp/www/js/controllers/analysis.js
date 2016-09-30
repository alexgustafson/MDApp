angular.module('MDApp.controllers')


  .controller('AnalysisCtrl', function ($scope, $rootScope, MDBorderService) {

    $scope.original_image = $rootScope.previewImage
    $scope.border_image = $rootScope.borderImage
    $scope.imageKey = $scope.original_image.substr($scope.original_image.lastIndexOf('/') + 1);

    $scope.$on("$ionicView.afterEnter", function (event, data) {


    });

    $scope.confirmBorder = function (confirmed) {
      $rootScope.borderConfirmed = confirmed;

      MDBorderService.some($scope.imageKey, confirmed);

      if (confirmed) {

      } else {
        $scope.original_image = "";
        $scope.border_image = "";
        $scope.imageKey = "";

      }
    };


  })
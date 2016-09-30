angular.module('MDApp.controllers')


  .controller('AnalysisCtrl', function ($scope, $rootScope, MDBorderService, $sce) {

    $scope.original_image = $sce.trustAsResourceUrl($rootScope.host+$rootScope.image_analysis.original);
    $scope.border_image = $sce.trustAsResourceUrl($rootScope.host+$rootScope.image_analysis.border);
    $scope.imageKey = $rootScope.image_analysis.id;

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
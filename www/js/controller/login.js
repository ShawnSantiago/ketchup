var app = angular.module('ketchup.login', [])

app.controller('loginCtrl', function ($scope, $state, UserService, $ionicHistory) {
  $scope.title = '';
  $scope.loggingIn = false;

  $scope.login = function () {
    if (!$scope.loggingIn) {
      $scope.loggingIn = true;
      UserService.loginUser().then(function () {
          $state.go('app.home');
          
          
       });
    } else {
      $state.go('app.home');
    }
  }
 
  $scope.$on("$ionicView.enter", function () {
      console.log("chatCtrl-Enter");
       $ionicHistory.clearCache().then(function(){
        console.log("cleared");
       })  
    }, function (errorObject) {

    console.log("The read failed: " + errorObject.code);
    });
});
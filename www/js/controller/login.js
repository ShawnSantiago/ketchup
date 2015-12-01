var app = angular.module('ketchup.login', [])

app.controller('loginCtrl', function ($scope, $state, UserService) {
  $scope.title = 'Login';
  $scope.loggingIn = false;

  $scope.login = function () {
    if (!$scope.loggingIn) {
      $scope.loggingIn = true;
      UserService.loginUser().then(function () {
          $scope.loggingIn = false;
          $state.go('app.home');
          
          
       });
    } else {
      $state.go('app.home');
    }
  }
});
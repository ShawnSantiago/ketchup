var app = angular.module('ketchup.menu', []);

app.controller('MenuCtrl', function($scope, $state, UserService, $ionicSideMenuDelegate) {

 
  $scope.logout = function () {
    UserService.logoutUser();
    $state.go('loginPage');
  };

});

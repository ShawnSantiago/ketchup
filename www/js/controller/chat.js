var app = angular.module('ketchup.chat', [])

app.controller('chatCtrl', function ($scope,
                                     FIREBASE_URL,
                                     UserService) {
  $scope.title = 'Chat';
  $scope.user = UserService.current;

  $scope.show = {};

  $scope.data = {
    messages: [],
    message: '',
    loading: true,
    showInfo: false
  };

  var messagesRef = new Firebase(FIREBASE_URL);

  $scope.loadMessages = function () {
  };

  $scope.sendMessage = function () {
  };

  console.log("chatCtrl-Created");

  $scope.$on("$ionicView.enter", function () {
    console.log("chatCtrl-Enter");
  });

  $scope.$on("$ionicView.beforeLeave", function () {
    console.log("chatCtrl-Leave");
  });

});
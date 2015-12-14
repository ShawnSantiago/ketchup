var app = angular.module('ketchup.friendsList', [])

app.controller('friendsListCtrl', function ($scope,
                                     FIREBASE_URL,
                                     UserService,$localstorage,$state) {
  $scope.title = 'Friends List';
 

  var user = $localstorage.get('ketchup-user');
 
  var ref = new Firebase(FIREBASE_URL);
  var postsRef = new Firebase(FIREBASE_URL + "/users/" + user + "/friendslist");
  






$scope.getFriends = function () {
    UserService.getFriends();
  };



$scope.$on("$ionicView.enter", function () {
    console.log("chatCtrl-Enter");
    postsRef.on("value", function(snapshot) {
    $scope.postInfo = snapshot.val();
    $scope.$broadcast('scroll.refreshComplete');
    $scope.friendsList = $scope.postInfo.friends.data
    $localstorage.setObject('ketchup-user-friends', $scope.friendsList);
    console.log($scope.friendsList)
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});
  });

  $scope.$on("$ionicView.beforeLeave", function () {
    console.log("chatCtrl-Leave");
  });

});
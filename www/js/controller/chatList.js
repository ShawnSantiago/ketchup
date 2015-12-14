var app = angular.module('ketchup.chatList', [])

app.controller('chatListCtrl', function ($scope,
                                     FIREBASE_URL,
                                     UserService,$localstorage,$state) {
  $scope.title = 'Chat List';
  $scope.chatActualId = "";
  var userID = $localstorage.get('ketchup-user-id');
  $scope.currentTime = new Date().getTime();
  $scope.$watchCollection('$scope.chatActualId', function() {
    console.log($scope.chatActualId)
    });
  console.log($scope.chatActualId)
 
  var user = $localstorage.get('ketchup-user');
  console.log(user)
  var ref = new Firebase(FIREBASE_URL);
  var messagesRef = new Firebase(FIREBASE_URL + "/posts");
  $scope.$on("$ionicView.enter", function () {
    console.log("chatCtrl-Enter");
  });
  messagesRef.on("value", function(snapshot) {
   $scope.data = snapshot.val();
  })
  
  $scope.chatActual = function(data) {
    $localstorage.set('ketchup-user-CurrentChat', data)
    $state.go('app.chat');
    console.log(data);
  };
   $scope.showCards = function(date , duration ,id , friends) {
      console.log(friends)
      var timeDiff = Math.round(($scope.currentTime - date)/100000);
      var divdeTime = Math.round(timeDiff / 60) ; 
      for (var i = 0; i <= friends.length; i++) {
       if (divdeTime <= duration && (id == userID || id == friends[i].id)) {
        
        return true
      } else {
        return false
      }
      };
      
    }

  
  
  $scope.$on("$ionicView.beforeLeave", function () {
    console.log("chatCtrl-Leave");
  });

});
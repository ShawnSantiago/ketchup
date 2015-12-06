var app = angular.module('ketchup.chatList', [])

app.controller('chatListCtrl', function ($scope,
                                     FIREBASE_URL,
                                     UserService,$localstorage,$state) {
  $scope.title = 'Chat List';
  $scope.chatActualId = "";
  
  $scope.$watchCollection('$scope.chatActualId', function() {
    console.log($scope.chatActualId)
    });
  console.log($scope.chatActualId)
 function makeid()
    {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 10; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
  var user = $localstorage.get('ketchup-user');
  console.log(user)
  var ref = new Firebase(FIREBASE_URL);
  var messagesRef = new Firebase(FIREBASE_URL + "/messages");
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

  
  
  $scope.$on("$ionicView.beforeLeave", function () {
    console.log("chatCtrl-Leave");
  });

});
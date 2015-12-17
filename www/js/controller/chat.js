var app = angular.module('ketchup.chat', [])

app.controller('chatCtrl', function ($scope,
                                     FIREBASE_URL,
                                     UserService,$localstorage,chatMessages,$ionicScrollDelegate,$route,$state) {
  $scope.title = 'Chat';
  $scope.user = $localstorage.get('ketchup-user-id');
  $scope.currentChat = $localstorage.get('ketchup-user-CurrentChat')
  console.log($scope.currentChat )
   var locationRef = new Firebase(FIREBASE_URL + "/posts/" + $scope.currentChat+"/location");
  locationRef.on("value", function(snapshot) {
    $scope.locationInfo = snapshot.val();
    console.log($scope.locationInfo)
      })
  var messagesRef = new Firebase(FIREBASE_URL + "/posts/" + $scope.currentChat+"/messagesArray");
  messagesRef.on("value", function(snapshot) {
    $scope.messageInfo = snapshot.val();
    $localstorage.setObject('ketchup-user-friends', $scope.postInfo);
  
  $scope.mapDirection = function(data) {
    $localstorage.setObject('ketchup-user-latlng', {latlang:data, dirBoolean:true});
    $state.go('app.map');
    console.log(data)
    };
  
  console.log($scope.user)
  $scope.messages = chatMessages;

    // a method to create new messages; called by ng-submit
    $scope.addMessage = function() {
      // calling $add on a synchronized array is like Array.push(),
      // except that it saves the changes to our database!
      $scope.messages.$add({
        from: $scope.user,
        content: $scope.message
      });

      // reset the message input
      $scope.message = "";
      $ionicScrollDelegate.scrollBottom();
    };

    var postId;
    $scope.data = {
      messages: [$scope.messageInfo],
      message: '',
      loading: true,
      showInfo: false
    };
    console.log($scope.data.messages )
    $scope.loadMessages = function () {

      var query = messagesRef
        .limiToLast(200);
        
        $scope.data.messages = $firebaseArray(query);

        $scope.data.messages.$loaded().then(function(data){
            console.log('AngularFire $loaded');
            $scope.data.loading = false;

        });
    };
})
  

  console.log("chatCtrl-Created");

  $scope.$on("$ionicView.enter", function () {
    console.log("chatCtrl-Enter");
    $route.reload();
     $localstorage.setObject('ketchup-user-friends', "");
  });

  $scope.$on("$ionicView.beforeLeave", function () {
    console.log("chatCtrl-Leave");
  });

});
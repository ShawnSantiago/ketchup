var app = angular.module('ketchup.chatList', [])

app.controller('chatListCtrl', function ($scope,
                                     FIREBASE_URL,
                                     UserService,$localstorage) {
  $scope.title = 'Chat List';
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
  var postsRef = new Firebase(FIREBASE_URL + "/users/" + user + "/messages");
  


postsRef.on("value", function(snapshot) {
    $scope.postInfo = snapshot.val();
    $scope.$broadcast('scroll.refreshComplete');
    console.log($scope.postInfo)
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

$scope.buildData = function() {

  var returnArr = [];

  angular.forEach($scope.postInfo, function(data, messages) {
      angular.forEach(data, function( chatPartners, fbID, time) {
        returnArr.push( {messageName: messages, chatPartners:chatPartners, fbID:fbID, time:time});            
      });
  });
   //apply sorting logic here
  return returnArr;
};
$scope.sortedData = $scope.buildData();
console.log($scope.sortedData)


  $scope.loadMessages = function () {
    postsRef.on("value", function(snapshot) {
      $scope.postInfo = snapshot.val();
      $scope.$broadcast('scroll.refreshComplete');
      console.log("done 1")
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
  });
  };




  $scope.$on("$ionicView.enter", function () {
    console.log("chatCtrl-Enter");
  });

  $scope.$on("$ionicView.beforeLeave", function () {
    console.log("chatCtrl-Leave");
  });

});
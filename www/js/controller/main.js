var app = angular.module('ketchup.main', [])

app.controller('mainCtrl', function( $scope, $timeout, UserService, $localstorage, $ionicSideMenuDelegate, FIREBASE_URL, $firebaseAuth, $firebase, $firebaseArray, $state) {
  $scope.model = {
      'title':'Main'
    }
    var userLocal= $localstorage.get('ketchup-user-location');
    var ref = new Firebase(FIREBASE_URL);
    var postsRef = new Firebase(FIREBASE_URL + "/posts");
    postsRef.on("value", function(snapshot) {
        $scope.postInfo = snapshot.val();
        $scope.$broadcast('scroll.refreshComplete');
        console.log("done 1")
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });

    $scope.doRefresh = function() {
      console.log("start")
      postsRef.on("value", function(snapshot) {
        $scope.postInfo = snapshot.val();
        $scope.$broadcast('scroll.refreshComplete');
        console.log("done 1")
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
   
    $timeout(function() {
          console.log("done 2")
        }, 250);
     
    console.log("done 3")
    }
    $scope.chatActual = function(data) {
      $localstorage.set('ketchup-user-CurrentChat', data)
      $state.go('app.chat');
      console.log(data);
  };

    $scope.title = 'Home';
  $scope.mapDirection = function(data) {
    $localstorage.setObject('ketchup-user-latlng', {latlang:data, dirBoolean:true});
    $state.go('app.map');
    };
  
    
  $scope.logout = function () {
    UserService.logoutUser();
    $state.go('intro');
  };

    
    
});

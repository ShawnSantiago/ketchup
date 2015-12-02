var app = angular.module('ketchup.main', [])

app.controller('mainCtrl', function( $scope, $timeout, UserService, $localstorage, $ionicSideMenuDelegate, FIREBASE_URL, $firebaseAuth, $firebase, $firebaseArray, $parse) {
  $scope.model = {
      'title':'Main'
    }

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
          $scope.$broadcast('scroll.refreshComplete');
          $scope.$broadcast('scroll.refreshComplete');
          console.log("done 2")
        }, 250);
     
    console.log("done 3")
    }

    $scope.title = 'Home';
   
    
    
  $scope.logout = function () {
    UserService.logoutUser();
    $state.go('intro');
  };

    
    
});

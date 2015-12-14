var app = angular.module('ketchup.main', [])

app.controller('mainCtrl', function( $scope, $timeout, UserService, $localstorage, $ionicSideMenuDelegate, FIREBASE_URL, $firebaseAuth, $firebase, $firebaseArray, $state) {
  var userID = $localstorage.get('ketchup-user-id');
  console.log(userID)
  $scope.model = {
      'title':'Main'
    }
    var friendsArray = [];
    var userLocal= $localstorage.get('ketchup-user-location');
    var ref = new Firebase(FIREBASE_URL);
    var postsRef = new Firebase(FIREBASE_URL + "/posts");
    postsRef.on("value", function(snapshot) {
        $scope.postInfo = snapshot.val();
        $scope.$broadcast('scroll.refreshComplete');
        // console.log($scope.postInfo)
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });

    $scope.messageShowArray = {}
    $scope.Math = window.Math;
    $scope.currentTime = new Date().getTime();
    $scope.time = function(data) {
      var timeDiff = Math.round(($scope.currentTime - data)/100000);
      var divdeTime = Math.round(timeDiff/60); 
      var fullTime;
      if ( divdeTime == 0) {
        fullTime = timeDiff + ' minutes ago'
        
      } else {
          fullTime = divdeTime + ' hours ago'
      }
    
      return fullTime
    };
    $scope.showCards = function(date ,duration ,id ,friends) {
     
      if (friendsArray.length == 0 ) {
        console.log("hit2");
        friendsArray.push(friends);     
      } else {
        for (var i=0; i == friendsArray.length; i++) {
          if (friends[i].id !== friendsArray[0][i].id ) {
            friendsArray.push(friendsArray[i])
          };
        };
      }

      console.log("hit 3");

    return hasPermission(date, duration, friendsArray);
     
   
    }
     function hasPermission(date, duration ,friends) {
        console.log(date ,duration, friends);
        var timeDiff = Math.round(($scope.currentTime - date)/100000);
        var divdeTime = Math.round(timeDiff / 60) ; 
          for (var i = 0; i == friends.length; i++) {
          console.log(i);
          console.log(friends[i].id)
          if (divdeTime <= duration && userID == friends[i].id) {
            console.log('permisson good')
            return true
          } 
          else if (divdeTime <= duration && id == userID) {
            console.log('permisson good')
            return true
          } 
          else {
            return false
          }
        }
      };
   

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

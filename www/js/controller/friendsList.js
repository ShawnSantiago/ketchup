var app = angular.module('ketchup.friendsList', [])

app.controller('friendsListCtrl', function ($scope,
                                     FIREBASE_URL,
                                     UserService,$ionicPopup, $localstorage,$state) {
  $scope.title = 'Friends List';
    var user = $localstorage.get('ketchup-user');
 
    var ref = new Firebase(FIREBASE_URL);
    var postsRef = new Firebase(FIREBASE_URL + "/users/" + user + "/friendslist/");
    var friendsSelRef = new Firebase(FIREBASE_URL + "/users/" + user + "/selectedfriendslist/");
   
    var newRole = {selected : true};
    postsRef.on("value", function(snapshot) {
      $scope.postInfo = snapshot.val();
      $scope.$broadcast('scroll.refreshComplete');
      $scope.friendsList = $scope.postInfo.friends.data;
      console.log($scope.friendsList)
      console.log($scope.friendsList)
   

    $scope.roles = $scope.friendsList;
   
    $scope.user = {
      roles: []
    };
    $scope.$watchCollection('user.roles', function() {
      
      console.log('stored ' + $scope.user.roles)

  });
    console.log($scope.user.roles)
    
    $scope.checkInfo = function() {
       
       console.log($scope.user.roles)
    }
 //   obj.$bindTo($scope, "data").then(function() {
 //   console.log($scope.data); // { foo: "bar" }
 //   $scope.data.foo = "baz";  // will be saved to the database
 //   ref.set({ foo: "baz" });  // this would update the database and $scope.data
  // });
    console.log($scope.user)
    $scope.checkAll = function() {
      $scope.user.roles = angular.copy($scope.roles);
    };
    $scope.uncheckAll = function() {
      $scope.user.roles = [];
    };
    $scope.checkFirst = function() {
      $scope.user.roles = [];
      $scope.user.roles.push($scope.roles[0]);
    };
     $scope.getFriends = function () {
      $localstorage.setObject('ketchup-user-friends', $scope.user.roles);
      $ionicPopup.alert({
           title: 'Complete',
           template: 'Got ya Facebook Friends'
         });
      $state.go('app.home')
    };

     }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });


   


//   var user = $localstorage.get('ketchup-user');
//   var ref = new Firebase(FIREBASE_URL);
//   var postsRef = new Firebase(FIREBASE_URL + "/users/" + user + "/friendslist");



$scope.$on("$ionicView.enter", function () {

    console.log("chatCtrl-Enter");
    
  });

  $scope.$on("$ionicView.beforeLeave", function () {
    console.log("chatCtrl-Leave");
  });

});
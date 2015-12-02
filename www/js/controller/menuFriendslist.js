var app = angular.module('ketchup.menuFriendslist', []);

app.controller('menuFriendslistCtrl', function($scope, $state, UserService, $ionicSideMenuDelegate, $localstorage,FIREBASE_URL,
                                     UserService,$localstorage) {

 
   	var user = $localstorage.get('ketchup-user');
 
  	var ref = new Firebase(FIREBASE_URL);
  	var postsRef = new Firebase(FIREBASE_URL + "/users/" + user + "/friendslist");
  	$scope.newList = [];
  	$scope.selection = [];
  	var newRole = {selected : true};
  	$scope.$on("$ionicView.enter", function () {
	    postsRef.on("value", function(snapshot) {
	    $scope.postInfo = snapshot.val();
	    console.log($scope.postInfo)	    
	    $localstorage.setObject('ketchup-user-friends', $scope.postInfo);
	    
	  	}, function (errorObject) {
	    	console.log("The read failed: " + errorObject.code);
		});
  	});

  	$scope.friendsList = $localstorage.getObject('ketchup-user-friends').friends.data;
  	
  	for (var i = 0; i < $scope.friendsList.length; i++) {
    	$scope.newList = $scope.friendsList[i];
    	$scope.newList.selected = false;
    	 console.log($scope.newList)
    };
  //   $scope.$watch('newList|filter:{selected:true}', function (nv) {
  //   $scope.selection = nv.map(function (fruit) {
  //     return newList.id;
  //   });
  // }, true);
   






});
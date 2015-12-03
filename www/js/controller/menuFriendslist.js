var app = angular.module('ketchup.menuFriendslist', []);

app.controller('menuFriendslistCtrl', function($scope, $state, UserService, $ionicSideMenuDelegate, $localstorage,FIREBASE_URL,
                                     UserService,$localstorage) {

 
   	var user = $localstorage.get('ketchup-user');
 
  	var ref = new Firebase(FIREBASE_URL);
  	var postsRef = new Firebase(FIREBASE_URL + "/users/" + user + "/friendslist/friends/data");
  
  	var newRole = {selected : true};
  	;
	
  	$scope.friendsList = [{id: "10207042891024578", name: "Kristen Nakamura"},
  						 {id: "10154494517268975", name: "Franky Sanche"}]

  	 console.log($scope.friendsList)
  	// for (var i = 0; i < $scope.friendsList.length; i++) {
   //  	$scope.newList = $scope.friendsList[i];
   //  	$scope.newList.selected = false;
    	
   //  };
    $scope.roles = $scope.friendsList;
    
  	$scope.user = {
    	roles: []
  	};
  	$scope.$watchCollection('user.roles', function() {
  		$localstorage.setObject('ketchup-post-user', $scope.user.roles);
  		console.log('sent ' + $scope.user.roles)

	});
  	console.log($scope.user.roles)
  	
  	$scope.checkInfo = function() {
  		 $localstorage.setObject('ketchup-post-user', $scope.user.roles);
  		 console.log($scope.user.roles)
  	}
 //  	obj.$bindTo($scope, "data").then(function() {
 //  	console.log($scope.data); // { foo: "bar" }
 //  	$scope.data.foo = "baz";  // will be saved to the database
 //  	ref.set({ foo: "baz" });  // this would update the database and $scope.data
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
  	$scope.$on("$ionicView.enter", function () {
	    postsRef.on("value", function(snapshot) {
	    $scope.postInfo = snapshot.val();
    
	    $localstorage.setObject('ketchup-user-friends', $scope.postInfo);
	    
	  	}, function (errorObject) {
	    	console.log("The read failed: " + errorObject.code);
		});
  	})
});
   

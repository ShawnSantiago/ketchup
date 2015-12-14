var app = angular.module('ketchup.friendsService', []);


app.service('friendsService', function (
                                     $q,
                                     $rootScope,
                                     $localstorage,
                                     $ionicPopup,
                                     FIREBASE_URL,
                                     $firebaseAuth,
                                     $firebase,
                                     $firebaseObject,
                                     UserService,$stateParams, OpenFB) {
	var ref = new Firebase(FIREBASE_URL);
	var usersRef = new Firebase(FIREBASE_URL + "/users");

	 OpenFB.get('/' + $stateParams.personId + '/friends', {limit: 50})
            .success(function (result) {
                $scope.friends = result.data;
            })
            .error(function(data) {
                alert(data.error.message);
            });
    })

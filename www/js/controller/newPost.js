var app = angular.module('ketchup.newPost', []);

app.controller('newPostCtrl', function ($scope, $state, $ionicLoading, $localstorage, UserService, $ionicPopup, FIREBASE_URL, $firebaseAuth, $firebase, $firebaseObject,$location,
$routeParams, $ionicPopover) {

  var user = $localstorage.get('ketchup-user');
  var ref = new Firebase(FIREBASE_URL);
  var postsRef = new Firebase(FIREBASE_URL + "/posts");
  var messagesRef = new Firebase(FIREBASE_URL + "/users/" + user + "/messages");
  var friendsRef = new Firebase(FIREBASE_URL + "/users/" + user + "/friendslist/friends/data");

  $scope.title = 'New Post';
  $scope.data = {
        postLocation: "",
        autoLocation: "",
        lenghtOfTime: "1",
        eventDesc: ""
    };
    $scope.friendsList = [{id: "10207042891024578", name: "Kristen Nakamura"},
               {id: "10154494517268975", name: "Franky Sanche"}]

    
    $scope.roles = $scope.friendsList;
    
    $scope.user = {
      roles: []
    };
  $scope.postFriends = $localstorage.getObject('ketchup-post-user');
  $scope.$watchCollection('postFriends', function() {
      $
      console.log('get ' + $scope.postFriends)

  });
  

  
  console.log($scope.log)

  
  $scope.textLocation = function () {
    
  
    $localstorage.set('ketchup-user-location', $scope.data.autoLocation);
    console.log($scope.data.autoLocation)
    $ionicPopup.alert({
     template: 'Location Set'
   });
    console.log("set");

  };
  $scope.centerOnMe = function () {
    console.log("Centering");

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });
    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos.coords);
      var latLong = [pos.coords.latitude, pos.coords.longitude]
      console.log(latLong);
       
        var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(latLong[0], latLong[1]);
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    $scope.data.postLocation = results[1].formatted_address;
                    console.log(results[1].formatted_address)
                    $localstorage.set('ketchup-user-location',results[1].formatted_address)
                    
                } else {
                    alert('Location not found');
                }
            } else {
                alert('Geocoder failed due to: ' + status);
            }
        });
      
      
      $localstorage.set('ketchup-user-latLong', latLong);
      $ionicLoading.hide();
      $ionicPopup.alert({
        template: 'Location Set'
      });
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };
  $scope.show = function() {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: '<b>Share</b> This' },
       { text: 'Move' }
     ],
     destructiveText: 'Delete',
     titleText: 'Modify your album',
     cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
       return true;
     }
   });

   // For example's sake, hide the sheet after two seconds
   $timeout(function() {
     hideSheet();
   }, 2000);

 };


  $scope.submit = function() {
    

    var userLocal= $localstorage.get('ketchup-user-location');
    var userData = $localstorage.getObject('ketchup-data');
    var userFriendsList = $localstorage.setObject('ketchup-user-friends');
    console.log(userData)    
    if( $scope.data.postLocation == null && userData == null ) {
       $ionicPopup.alert({
          template: 'Please Enter Data'
        }); 
    } else {
      $localstorage.setObject('ketchup-post-user', null);
      
      
      postsRef.push({
        name : userData.facebook.cachedUserProfile.name ,
        profileImage : userData.facebook.cachedUserProfile.picture.data.url ,
        location :  userLocal , 
        message : $scope.data.eventDesc,
        comments : 0

      });
      $state.go('app.home');
    }
  }
  var template = '<ion-popover-view><ion-header-bar class="bar-assertive" align-title="center"> <h1 class="title">Friends Lists</h1> </ion-header-bar> <ion-content><div class="list" ng-repeat="role in roles"><div class="item item-avatar"><img ng-src="http://graph.facebook.com/{{role.id}}/picture?type=square"><h4>{{role.name}}</h4><label class="checkbox"><input type="checkbox" data-checklist-model="user.roles" data-checklist-value="role" ng-click="checkInfo()"></label></div></div></ion-content></ion-popover-view>';
    $scope.popover = $ionicPopover.fromTemplate(template, {
        scope: $scope
    });
    $scope.openPopover = function($event) {
      $scope.popover.show($event);
    };
    $scope.closePopover = function() {
      $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.popover.remove();
    });
  $scope.$on("$ionicView.enter", function () {
    console.log("chatCtrl-Enter");
    
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

  $scope.$on("$ionicView.beforeLeave", function () {
    console.log("newPost-Leave");
    $localstorage.setObject('ketchup-post-user', null);
    $route.reload();
 
  }); 

 
});
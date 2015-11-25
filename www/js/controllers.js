

var app = angular.module('ketchup.controllers', [])


app.controller('mapCtrl', function($scope, $ionicLoading, $localstorage) {
  $scope.model = {
      'title':'Map'
    }
  $scope.title = 'Map';
  $scope.mapCreated = function(map) {
    $scope.map = map;
    
  };

  $scope.centerOnMe = function () {
    console.log("Centering");
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
      $localstorage.set('ketchup-user', authData.uid);
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };
});

app.controller('mainCtrl', function( $scope, $timeout, UserService, $localstorage, $ionicSideMenuDelegate, FIREBASE_URL, $firebaseAuth, $firebase, $firebaseObject) {
    var ref = new Firebase(FIREBASE_URL);
    var postsRef = new Firebase(FIREBASE_URL + "/posts");
    
    $scope.title = 'Home';
    var postInfo = $firebaseObject(postsRef);
    console.log(postInfo)
    postInfo.$bindTo($scope, "post");
    
  $scope.logout = function () {
    UserService.logoutUser();
    $state.go('intro');
  };

    
    
});

app.controller('loginCtrl', function ($scope, $state, UserService) {
  $scope.title = 'Login';
  $scope.loggingIn = false;

  $scope.login = function () {
    if (!$scope.loggingIn) {
      $scope.loggingIn = true;
      UserService.loginUser().then(function () {
          $scope.loggingIn = false;
          $state.go('app.home');
       });
    }
  }
});

app.controller('chatCtrl', function ($scope,
                                     FIREBASE_URL,
                                     UserService) {
  $scope.title = 'Chat';
  $scope.user = UserService.current;

  $scope.show = {};

  $scope.data = {
    messages: [],
    message: '',
    loading: true,
    showInfo: false
  };

  var messagesRef = new Firebase(FIREBASE_URL);

  $scope.loadMessages = function () {
  };

  $scope.sendMessage = function () {
  };

  console.log("chatCtrl-Created");

  $scope.$on("$ionicView.enter", function () {
    console.log("chatCtrl-Enter");
  });

  $scope.$on("$ionicView.beforeLeave", function () {
    console.log("chatCtrl-Leave");
  });

});

app.controller('newPostCtrl', function ($scope, $state, $ionicLoading, $localstorage, UserService, $ionicPopup, FIREBASE_URL, $firebaseAuth, $firebase, $firebaseObject) {
  $scope.title = 'New Post';
  $scope.data = {
        postLocation: "",
        lenghtOfTime: "1",
        eventDesc: ""
    };
  var ref = new Firebase(FIREBASE_URL);
  var postsRef = new Firebase(FIREBASE_URL + "/posts");
 
  
  $scope.textLocation = function () {
    
  
    $localstorage.set('ketchup-user-location', $scope.data.postLocation);
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

  $scope.submit = function() {
    
    var data = $scope.data;
    
    var userData = $localstorage.getObject('ketchup-data');
    var userUID = userData.uid;
    var sendData = [userData.facebook ,data ,userUID]
    
    console.log(sendData)
    postsRef.child("postMessage")
     .transaction(function(data) {
        if( data != null && userData !=null ) {
           $ionicPopup.alert({
              template: 'Please Enter Data'
            }); 
        } else {
          return sendData;
        }
        
        
    });
   }
   
});


app.controller('MenuCtrl', function($scope, $state, UserService, $ionicSideMenuDelegate) {

 
  $scope.logout = function () {
    UserService.logoutUser();
    $state.go('loginPage');
  };

});

// .controller('AppController', function($scope, $ionicSideMenuDelegate) {
//   $scope.toggleLeft = function() {
//     $ionicSideMenuDelegate.toggleLeft();
//   };
// })


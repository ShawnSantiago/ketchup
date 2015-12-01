var app = angular.module('ketchup.newPost', []);

app.controller('newPostCtrl', function ($scope, $state, $ionicLoading, $localstorage, UserService, $ionicPopup, FIREBASE_URL, $firebaseAuth, $firebase, $firebaseObject) {
  $scope.title = 'New Post';
  $scope.data = {
        postLocation: "",
        autoLocation: "",
        lenghtOfTime: "1",
        eventDesc: ""
    };

  var ref = new Firebase(FIREBASE_URL);
  var postsRef = new Firebase(FIREBASE_URL + "/posts");
 
  
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

  $scope.submit = function() {
    

    var userLocal= $localstorage.get('ketchup-user-location');
    console.log(userLocal)
    var userData = $localstorage.getObject('ketchup-data');
    console.log(userData)    
    if( $scope.data.postLocation == null && userData == null ) {
       $ionicPopup.alert({
          template: 'Please Enter Data'
        }); 
    } else {
      $state.go('app.home');
      postsRef.push({
        name : userData.facebook.cachedUserProfile.name ,
        profileImage : userData.facebook.cachedUserProfile.picture.data.url ,
        location :  userLocal , 
        message : $scope.data.eventDesc

      });
    }
  } 
});
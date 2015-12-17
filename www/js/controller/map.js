

var app = angular.module('ketchup.map', [])


app.controller('mapCtrl', function($scope, $ionicLoading, $localstorage, uiGmapGoogleMapApi, $route, $ionicHistory,$localstorage, $ionicSideMenuDelegate, FIREBASE_URL, $firebaseAuth, $firebase, $firebaseArray, $state) {
   var postsRef = new Firebase(FIREBASE_URL + "/posts");
  
  
  $scope.markersMaker = function(data) {
  
      angular.forEach(data, function(key) {
      $scope.markersModel.push(key.latLong)
      });
    
    }
    $scope.markersModel = [];
    $scope.$watchCollection('markersModel', function(value) {
      
      console.log(value)
    });
   
  var getDirections = false;
  
  $scope.model = {
      'title':'Map'
  }

  $scope.latLng;

  $scope.title = 'Map';
  $scope.$watchCollection('latLng', function(value) {
      $scope.map = { 
        control: {} , 
        center:  $scope.latLng, 
        zoom: 10
      };
      console.log(value)
    });
 
  // instantiate google map objects for directions
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var directionsService = new google.maps.DirectionsService();
  var geocoder = new google.maps.Geocoder();
  
  // directions object -- with defaults
  
  
  // get directions using google maps api
  $scope.getDirections = function () {
    $scope.directions = {
      origin: $scope.locallatLng,
      destination: $scope.locationLocal.latlang,
      showList: false
    }
    var request = {
      origin: $scope.directions.origin,
      destination: $scope.directions.destination,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    directionsService.route(request, function (response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        directionsDisplay.setMap($scope.map.control.getGMap());
        directionsDisplay.setPanel(document.getElementById('directionsList'));
        $scope.directions.showList = true;
      } else {
        alert('Google route unsuccesfull!');
      }
    });
  }
  $scope.centerOnMe = function () {
    console.log("Centering");
  

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos.coords);
      var lat = pos.coords.latitude;
      var lng = pos.coords.longitude;
      console.log(lat +' ' + lng);
      $scope.latLng = {latitude:lat, longitude:lng};
      $scope.locallatLng = {lat,lng};
      
     
    $ionicLoading.hide();
    if ($scope.locationLocal.dirBoolean) {
        $scope.getDirections() 
      }
  
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };



  $scope.$on("$ionicView.enter", function () {
      console.log("chatCtrl-Enter");
       $localstorage.setObject('ketchup-user-friends', "");
      $ionicHistory.clearCache();
      $route.reload();
      $scope.locationLocal = $localstorage.getObject('ketchup-user-latlng');
      console.log($scope.locationLocal)
      if ($scope.locationLocal.dirBoolean) {
        $scope.centerOnMe()
        

      } else {
        $scope.centerOnMe()
        postsRef.on("value", function(snapshot) {
        $scope.postInfo = snapshot.val();
        console.log($scope.postInfo)
        $scope.markersMaker($scope.postInfo);   
        })

      }
      
      
      
      
    
      
    }, function (errorObject) {

    console.log("The read failed: " + errorObject.code);
    });
  $scope.$on("$ionicView.beforeLeave", function () {
    console.log("newPost-Leave");
    $route.reload();
    $ionicHistory.clearCache();
    $localstorage.setObject('ketchup-user-latlng', {latlang:"", dirBoolean:false});
    
    
 
  }); 

});
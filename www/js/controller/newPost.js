var app = angular.module('ketchup.newPost', []);

app.controller('newPostCtrl', function ($scope, $state, $ionicLoading, $localstorage, UserService, $ionicPopup, FIREBASE_URL, $firebaseAuth, $firebase, $firebaseObject,$location,
$routeParams, $ionicPopover, $route) {

  var user = $localstorage.get('ketchup-user');
  var userID = $localstorage.get('ketchup-user-id');
  // var userData = $localstorage.getObject('ketchup-data');
  // console.log(userData)
  var postsRef = new Firebase(FIREBASE_URL + "/posts");
  var messagesRef = new Firebase(FIREBASE_URL + "/messages");


  $scope.title = 'New Post';
  $scope.data = {
        postLocation: "",
        postLocationNameShort: "",
        autoLocation: "",
        lenghtOfTime: "",
        eventDesc: "",
        id : makeid(),
        title : "",
        latLong:"",
        
    };
    $scope.details = function(details){
      console.log(details.geometry.location.lat())
      $scope.data.latLong = {id:makeid() , latitude: details.geometry.location.lat(), longitude : details.geometry.location.lng()}
    };

    // $scope.friendsList = [{id: "10207042891024578", name: "Kristen Nakamura"},
    //            {id: "10154494517268975", name: "Franky Sanche"}]
    $scope.roles = $localstorage.getObject('ketchup-user-friends');
    // $scope.roles.push({id:userData.facebook.id , name:userData.facebook.displayName})
    $scope.user = {
      roles: []
    };
    console.log( $scope.roles)

    $scope.$watchCollection('data.lenghtOfTime', function(value) {
      
      console.log(value)
    });
    $scope.$watchCollection('data.postLocation', function(value) {
      
      console.log(value)
    });
   
    var dataRefined = [];
    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 10; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
 
    $scope.$watchCollection('user.roles', function() {
      var data = $scope.user.roles; 
      angular.forEach(data, function(data) {
        console.log("done")
        delete data['$$hashKey'];
      }, dataRefined)
    });

  $scope.clear = function (){
    $scope.data.postLocation = "";    
    
  }
    
  // $scope.textLocation = function () {  
  //   console.log($scope.data.autoLocation)
  //   $ionicPopup.alert({
  //    template: 'Location Set'
  //  });
  //   console.log("set");

  // };
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
                    //console.log(results[0])
                    $scope.data.latLong = {id:makeid() ,Latitude: results[0].geometry.viewport["O"]["O"], longitude: results[0].geometry.viewport["j"]["j"]};
                    console.log($scope.data.latLong)
                    $scope.data.postLocationNameShort = results[1].address_components[0].short_name;
                    $scope.data.postLocation = results[1].formatted_address;
                    $localstorage.set('ketchup-user-latlng',results[1].formatted_address);
                    $localstorage.set('ketchup-user-location',results[1].formatted_address);
                    $scope.locationLocal = $localstorage.get('ketchup-user-location');
                    $route.reload();
                    
                } else {
                    alert('Location not found');
                }
            } else {
                alert('Geocoder failed due to: ' + status);
            }
        });
      
      
      $localstorage.set('ketchup-user-latLong', latLong);
      $ionicLoading.hide();
      // $ionicPopup.alert({
      //   template: 'Location Set'
      // });
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };
  


  $scope.submit = function() {
    
    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 10; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    var currentId = makeid();
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
      
      var fulldate = new Date().getTime()

      postsRef.child(currentId)
         .transaction(function () {  
              return {
                name : userData.facebook.cachedUserProfile.name ,
                profileImage : userData.facebook.cachedUserProfile.picture.data.url ,
                location :  $scope.data.postLocation , 
                locationNameShort : $scope.data.postLocationNameShort,
                message : $scope.data.eventDesc,
                comments : 0,
                friends: $scope.user.roles,
                userID: userID,
                date: fulldate,
                time: $scope.data.lenghtOfTime,
                latLong : $scope.data.latLong ,                 
                id : currentId

                
              };
            
          },
          function (error, committed) {
              console.log("error: " + error)
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
      $route.reload();
      $scope.centerOnMe();
    
      
    }, function (errorObject) {

    console.log("The read failed: " + errorObject.code);
    });

  $scope.$on("$ionicView.beforeLeave", function () {
    console.log("newPost-Leave");
    // $localstorage.set('ketchup-user-location','')
    // $scope.data.postLocation = ""; 
    
    
 
  }); 

 
});


var app = angular.module('ketchup.controllers', [])


app.controller('mapCtrl', function($scope, $ionicLoading) {
 
  $scope.name = 'Home';
  $scope.mapCreated = function(map) {
    $scope.map = map;
    $scope.name = 'Main';
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
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };
});

app.controller('mainCtrl', ['$scope', '$timeout', function($scope, $timeout) {
    
    $scope.title = 'Home';
    $scope.model = {

    profiles: [
      {
        'name': 'Steve Smith',
        'profilePicImage': 'img/profiles/ionic.png',
        'desc': 'Anyone up for soccer',
        'numberOfComments' : 5 , 
        'location': {
          'locationName': 'Trinity Bellwoods',
          'distanceTo' : 3.2

        }
      },
      {
        'name': 'Steve Smith',
        'profilePicImage': 'img/profiles/ionic.png',
        'desc': 'Anyone up for soccer',
        'numberOfComments' : 5 , 
        'location': {
          'locationName': 'Trinity Bellwoods',
          'distanceTo' : 3.2
        }
      },
      {
        'name': 'Steve Smith',
        'profilePicImage': 'img/profiles/ionic.png',
        'desc': 'Anyone up for soccer',
        'numberOfComments' : 5 ,
        'location': {
          'locationName': 'Trinity Bellwoods',
          'distanceTo' : 3.2
        }
      }
    ]
  };
    
    
}]);



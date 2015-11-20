

var app = angular.module('ketchup.controllers', [])


app.controller('mapCtrl', function($scope, $ionicLoading) {
  $scope.model = {
      'title':'Map'
    }
  $scope.title = 'Map';
  $scope.mapCreated = function(map) {
    $scope.map = map;
    $scope.name = 'Map';
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

app.controller('mainCtrl', ['$scope', '$timeout', 'UserService' , function($scope, $timeout , UserService) {

    $scope.user = UserService;

    $scope.title = 'Home';
    $scope.model = {
      'title':'Main'
    }
  $scope.logout = function () {
    UserService.logoutUser();
    $state.go('intro');
  };

    
    
}]);

app.controller('loginCtrl', function ($scope, $state, UserService) {
  $scope.title = 'Login';
  $scope.loggingIn = false;

  $scope.login = function () {
    if (!$scope.loggingIn) {
      $scope.loggingIn = true;
      UserService.loginUser().then(function () {
          $scope.loggingIn = false;
          $state.go('home');
       });
    }
  }
});

app.controller('chatCtrl', function ($scope,
                                     FIREBASE_URL,
                                     UserService) {
  $scope.title = 'Chat';
  $scope.user = UserService;

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

app.controller('newPostCtrl', function ($scope, $state, UserService) {
  $scope.title = 'New Post';
 

  
});




var app = angular.module('ketchup', ['ionic', 'ngCordova',
	'firebase','angularMoment','ketchup.controllers', 'ketchup.directives', 'ketchup.services'])


app.constant("FIREBASE_URL", 'http://ketchuptest.firebaseio.com');
app.constant("FACEBOOK_APP_ID", '1489325994730790');


app.run(function ($rootScope, $ionicPlatform, $cordovaStatusbar) {


		$ionicPlatform.ready(function () {

			// Hide the accessory bar by default
			if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}
			// Color the iOS status bar text to white
			if (window.StatusBar) {
				$cordovaStatusbar.overlaysWebView(true);
				$cordovaStatusbar.style(0); //Light
			}
		});
	});

app.config(function ($stateProvider, $urlRouterProvider, FACEBOOK_APP_ID) {
	openFB.init({appId: FACEBOOK_APP_ID});
});



app.config(function ($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('loginPage', {
			url: "/",
			templateUrl: "pages/loginPage.html",
			controller: 'loginCtrl'
			
		})
		.state('home', {
			url: "/pages/mainPage.html",
			templateUrl: "/pages/mainPage.html",
			controller: 'mainCtrl'
			
		})
		.state('map', {
			url: "/pages/mapPage.html",
			templateUrl: "pages/mapPage.html",
			controller: 'mapCtrl'
			
		})
		.state('chat', {
			url: "/pages/chatPage.html",
			templateUrl: "pages/chatPage.html",
			controller: 'chatCtrl'
			
		})
		.state('newPost', {
			url: "/pages/newPostPage.html",
			templateUrl: "pages/newPostPage.html",
			controller: 'newPostCtrl'
			
		})
		
	;

	$urlRouterProvider.otherwise('/');

});


// app.run(['$rootScope', '$location', '$cookieStore', '$http',
//     function ($rootScope, $location, $cookieStore, $http) {
//         // keep user logged in after page refresh
//         $rootScope.globals = $cookieStore.get('globals') || {};
//         if ($rootScope.globals.currentUser) {
//             $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
//         }
  
//         $rootScope.$on('$locationChangeStart', function (event, next, current) {
//             // redirect to login page if not logged in
//             if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
//                 $location.path('/login');
//             }
//         });
//     }]);

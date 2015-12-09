

var app = angular.module('ketchup', ['ionic', 'ngCordova',
	'firebase','openFB','ngAutocomplete','angularMoment','ketchup.controllers', 'ketchup.directives', 'ketchup.services',"checklist-model",'ngRoute'])


app.constant("FIREBASE_URL", 'http://ketchuptest.firebaseio.com');
app.constant("FACEBOOK_APP_ID", '1489325994730790');


app.run(function ($rootScope, $ionicPlatform, $cordovaStatusbar,ngFB) {


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
		.state('app', {
				url: "/app",
				abstract: true,
				templateUrl: "pages/menu.html",
				controller: 'MenuCtrl'
			})
		// .state('appFriendsList', {
		// 		url: "/appFriendsList",
		// 		abstract: true,
		// 		templateUrl: "pages/menuFriendslist.html",
		// 		controller: 'menuFriendslistCtrl'
		// 	})
		.state('app.home', {
			url: "/mainPage",
			views: {
				'menuContent': {
					templateUrl: "pages/mainPage.html",
					controller: 'mainCtrl'
				}
			}
			
		})
		.state('app.map', {
			url: "/mapPage",
			views: {
				'menuContent': {
					templateUrl: "pages/mapPage.html",
					controller: 'mapCtrl'
				}
			}		
			
		})
		.state('app.chat', {
			url: "/chatPage",
			views: {
				'menuContent': {
					templateUrl: "pages/chatPage.html",
					controller: 'chatCtrl'
				}
			}		
			
		})
		.state('app.chatList', {
			url: "/chatList",
			views: {
				'menuContent': {
					templateUrl: "pages/chatList.html",
					controller: 'chatListCtrl'
				}
			}		
			
		})
		.state('app.newPost', {
			url: "/newPostPage",
			views: {
				'menuContent': {
					templateUrl: "pages/newPostPage.html",
					controller: 'newPostCtrl'
				}
			}	
		})
		.state('app.friendsList', {
			url: "/friendsList",
			views: {
				'menuContent': {
					templateUrl: "pages/friendsList.html",
					controller: 'friendsListCtrl'
				}
			}	
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

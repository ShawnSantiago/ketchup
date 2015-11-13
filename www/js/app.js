

var app = angular.module('ketchup', ['ionic', 'ketchup.controllers', 'ketchup.directives'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

app.config(function ($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('main', {
			url: "/",
			templateUrl: "pages/main.html",
			controller: 'main'
			
		})
		.state('map', {
			url: "/pages/second.html",
			templateUrl: "pages/second.html",
			controller: 'MapCtrl'
			
		})
		.state('loginPage', {
			url: "/pages/loginPage.html",
			templateUrl: "pages/loginPage.html",
			controller: 'LoginCtrl'
			
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

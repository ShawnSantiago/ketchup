

var app = angular.module('ketchup', ['ionic', 'ketchup.controllers', 'ketchup.directives'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

// app.config(function ($routeProvider) {
    
//     $routeProvider
    
//     .when('/', {
//         templateUrl: 'pages/mainPage.html',
//         controller: 'mainCtrl'
//     })
    
//     .when('/second', {
//         templateUrl: 'pages/second.html',
//         controller: 'secondController'
//     })
    
// });

app.config(function ($stateProvider) {

	$stateProvider
		.state('index', {
			url: "/",
			templateUrl: "/pages/mainPage.html",
			controller: 'mainCtrl'
			
		})
		.state('map', {
			url: "/pages/mapPage.html",
			templateUrl: "pages/mapPage.html",
			controller: 'mapCtrl'
			
		})
		.state('loginPage', {
			url: "/pages/loginPage.html",
			templateUrl: "pages/loginPage.html",
			controller: 'loginCtrl'
			
		})
	;

	// $urlRouterProvider.otherwise('/');

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

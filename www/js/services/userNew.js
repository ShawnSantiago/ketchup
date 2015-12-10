var app = angular.module('ketchup.services.userService', []);


app.service('UserService', function (
                                     $q,
                                     $rootScope,
                                     $localstorage,
                                     $ionicPopup,
                                     FIREBASE_URL,
                                     $firebaseAuth,
                                     $firebase,
                                     $firebaseObject, 
                                     $ionicModal, 
                                     $timeout
                                     ) {
	var ref = new Firebase(FIREBASE_URL);
	var usersRef = new Firebase(FIREBASE_URL + "/users");
	var self = {
		/* This contains the currently logged in user */
		current: {},

		/*
		 Makes sure the favorites property is preset on the current user.

		 firebase REMOVES any empty properties on a save. So we can't
		 bootstrap the user object with favorites: {}.
		 */
		ensureFavorite: function () {
			if (!self.current.favorites) {
				self.current.favorites = {};
			}
		},

		/*
		 If adds or removes a show from the users favorites list
		 */
		toggleFavorite: function (show) {
			// Toggles the favorite setting for a show for the current user.
			self.ensureFavorite();
			if (self.current.favorites[show.showid]) {
				self.removeFavorite(show)
			} else {
				self.addFavorite(show)
			}
			self.current.$save();
		},
		/*
		 Adds a show to the users favorites shows list
		 */
		addFavorite: function (show) {
			self.ensureFavorite();
			self.current.favorites[show.showid] = show;
		},
		/*
		 Removes a show from the users favorites shows list
		 */
		removeFavorite: function (show) {
			self.ensureFavorite();
			self.current.favorites[show.showid] = null;
		},
		/*
		 Checks to see if a user has already logged in in a previous session
		 by checking localstorage, if so then loads that user up from firebase.
		 */
		loadUser: function () {
			var d = $q.defer();

			// UNCOMMENT WHEN GOING THROUGH LECTURES
			
			// Check local storage to see if there is a user already logged in
			var currentUserId = $localstorage.get('ketchup-user', null);
			if (currentUserId && currentUserId != "null") {
				// If there is a logged in user then load up the object via firebase
				// and use $firebaseObject to keep it in sync between our
				// application and firebase.
				console.debug("Found previously logged in user, loading from firebase ", currentUserId);
				var user = $firebaseObject(usersRef.child(currentUserId));
				user.$loaded(function () {
					// When we are sure the object has been completely
					// loaded from firebase then resolve the promise.
					self.current = user;
					//self.identifyUser();
					d.resolve(self.current);
				});
			} else {
				d.resolve();
			}

			
			return d.promise;
		},
		
		 
		 
		logoutUser: function () {
			$localstorage.set('ketchup-user', null);
			self.current = {};
		},
			 
		loginUser: function () {
			var d = $q.defer();

			self.loadUser().then(function (user) {
				if (user) {
					d.resolve(self.current);
				} else {

					ngFB.login({scope: 'email,read_stream,publish_actions'}).then(
						function (response) {
				    		if (response.status === 'connected') {
				        		
				            } else {
				                alert('Facebook login failed');
				            }
						}),
						{
							scope: 'email' // Comma separated list of permissions to request from facebook
						}
				
			}
		})
	
			return d.promise;
		}
	}


	self.loadUser();

	return self;

})
;
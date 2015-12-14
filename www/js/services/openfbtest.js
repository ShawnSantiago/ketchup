ngFB.login({scope: 'email,read_stream,publish_actions'}).then(
		function (response) {
    		if (response.status === 'connected') {
        		console.log('Facebook login succeeded');
        		var token = response.authResponse.accessToken;
        		ngFB.api({
					path: '/me',
					params: {fields: 'id,name'}
				}).then(
		        success: function (userData) {
					console.log('Got data from facebook about current user');
					console.log(userData);
					//
					// We got details of the current user now authenticate via firebase
					//
					console.log('Authenticating with firebase');


					var auth = $firebaseAuth(ref);
					auth.$authWithOAuthToken("facebook", token)
						.then(function (authData) {
							console.log("Authentication success, logged in as:", authData.uid);
							console.log(authData);
							
							// We've authenticated, now it's time to either get an existing user
							// object or create a new one.
							//
							usersRef.child(authData.uid)
								.transaction(function (currentUserData) {
									if (currentUserData === null) {
										//
										// If the transaction is a success and the current user data is
										// null then this is the first time firebase has seen this user id
										// so this user is NEW.
										//
										// Any object we return from here will be used as the user data
										// in firebase
										//
										return {
											'name': userData.name,
											'profilePic': 'http://graph.facebook.com/' + userData.id + '/picture',
											'userId': userData.id
										};
									}
								},
								function (error, committed) {
									//
									// This second function in the transaction clause is always called
									// whether the user was created or is being retrieved.
									//
									// We want to store the userid in localstorage as well as load the user
									// and store it in the self.current property.
									//
									$localstorage.set('ketchup-user', authData.uid);
									$localstorage.setObject('ketchup-data', authData);
									self.current = $firebaseObject(usersRef.child(authData.uid));
									self.current.$loaded(function () {
										// When we are sure the object has been completely
										// loaded from firebase then resolve the promise.
										d.resolve(self.current);
									});
								});
						})
						.catch(function (error) {
							console.error("Authentication failed:", error);
							//
							// We've failed to authenticate, show the user an error message.
							//
							$ionicPopup.alert({
								title: "Error",
								template: 'There was an error logging you in with facebook, please try later.'
							});
							d.reject(error);
						});

				},
				error: function (error) {
				console.error('Facebook error: ' + error.error_description);
				//
				// There was an error calling the facebook api to get details about the
				// current user. Show the user an error message
				//
				$ionicPopup.alert({
				title: "Facebook Error",
				template: error.error_description
				});
				d.reject(error);
				}
		        )} else {
					console.error('Facebook login failed');
					//
					// There was an error authenticating with facebook
					// Show the user an error message
					//
					$ionicPopup.alert({
						title: "Facebook Error",
						template: 'Failed to login with facebook'
					});
					d.reject(error);
				}
			})
				




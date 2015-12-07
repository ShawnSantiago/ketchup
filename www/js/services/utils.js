var app = angular.module('ketchup.utils', ['firebase']);

app.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);

app.directive('ngEnter', function () {
	return function (scope, element, attrs) {
		element.bind("keydown keypress", function (event) {
			if (event.which === 13) {
				scope.$apply(function () {
					scope.$eval(attrs.ngEnter);
				});

				event.preventDefault();
			}
		});
	};
});

app.factory("chatMessages", ["$firebaseArray",'$localstorage','FIREBASE_URL',
  function($firebaseArray, $localstorage, FIREBASE_URL) {
    // create a reference to the database location where we will store our data
    var currentChat = $localstorage.get('ketchup-user-CurrentChat')
    
    var ref = new Firebase(FIREBASE_URL + "/messages/" + currentChat + "/messeagesArray/");
    // this uses AngularFire to create the synchronized array
    return $firebaseArray(ref);
  }
]);

app.directive('focusInput', function($timeout) {
  return {
    link: function(scope, element, attrs) {
      element.bind('click', function() {
        $timeout(function() {
          element.parent().parent().find('input')[0].focus();
        });
      });
    }
  };
});

// app.factory('Message', ['$firebase','$localstorage','FIREBASE_URL',
//   function($firebase, $localstorage, FIREBASE_URL) {
//     var ref = new Firebase(FIREBASE_URL);
//     var currentChat = $localstorage.get('ketchup-user-CurrentChat')
//     var messages = $firebase(ref.child('messeagesArray')).$asArray()

//     var Message = {
//       all: messages,
//       create: function (message) {
//         return messages.$add(message);
//       },
//       get: function (messageId) {
//         return $firebase(ref.child(messageId)).$asObject();
//       },
//       delete: function (message) {
//         return messages.$remove(message);
//       }
//     };
 
//     return Message;
 
//   }
//   ]);



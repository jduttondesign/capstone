"use strict";
console.log("loaded AppConfig");

let isAuth = (AuthFactory) => new Promise((resolve, reject) => {
	if(AuthFactory.isAuthenticated()){
		resolve();
	} else {
		reject();
	}
});

app.run(function($rootScope, $location, FIREBASE_CONFIG, AuthFactory){
  firebase.initializeApp(FIREBASE_CONFIG);

$rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
	
	let logged = AuthFactory.isAuthenticated();
	let appTo;

	if(currRoute.originalPath){

		appTo = currRoute.originalPath.indexOf('/auth') !== -1;
	}

	if(!appTo && !logged){
		event.preventDefault();
		$location.path('/auth');
	}
});

});

app.config(function($routeProvider){
	$routeProvider
		.when('/auth', {
			templateUrl: 'partials/auth.html',
			controller:'AuthCtrl'
		})
		.when('/list', {
			templateUrl: 'partials/volunteer-list.html',
			controller: 'ListCtrl'
			// resolve: {isAuth}
		})
		.when('/new', {
			templateUrl: 'partials/donation-new.html',
			controller: 'NewCtrl'
			// resolve: {isAuth}
		})
		.when('/view/:id', {
			templateUrl: 'partials/donation-view.html',
			controller: 'DonationCtrl'
			// resolve: {isAuth}
		})
		.when('/edit/:id', {
			templateUrl: 'partials/donation-edit.html',
			controller:'EditCtrl'
			// resolve: {isAuth}
		})
		.when('/logout', {
			templateUrl: 'partials/auth.html',
			controller: 'AuthCtrl'
			// resolve: {isAuth}
		})
		.otherwise('/auth');
});

console.log("AppConfig loaded");
"use strict";

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
		.when('/donation/list', {
			templateUrl:'partials/donation-list.html',
			controller: 'DonationListCtrl',
			resolve: {isAuth}
		})
		.when('/donation/new', {
			templateUrl:'partials/donation-new.html',
			controller: 'DonationNewCtrl',
			 resolve: {isAuth}
		})
		.when('/donation/view/:id', {
			templateUrl: 'partials/donation-view.html',
			controller: 'DonationViewCtrl',
			 resolve: {isAuth}
		})
		.when('/donation/edit/:id', {
			templateUrl: 'partials/donation-edit.html',
			controller:'DonationEditCtrl',
			resolve: {isAuth}
		})
		.when('/logout', {
			templateUrl: 'partials/auth.html',
			controller: 'AuthCtrl',
			resolve: {isAuth}
		})
		.otherwise('/auth');
});
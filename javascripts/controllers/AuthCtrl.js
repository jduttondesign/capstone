"use strict";
console.log("loaded AuthCtrl");

app.controller("AuthCtrl", function($scope, $rootScope, $location, AuthFactory, UserFactory){
	$scope.loginContainer = true;
	$scope.registerContainer = false;
	$scope.login = {
		email: "a@a.com",
		password: "123456"
	};

	if($location.path() === "/logout"){
		AuthFactory.logout();
		$rootScope.user ={};
		$location.url("/auth");
	}

	let logMeIn = function(loginStuff){
		AuthFactory.authenticate(loginStuff).then(function(didLogin){
			console.log("didLogin", didLogin);
			return UserFactory.getUser(didLogin.uid);
		})
		 .then(function(userCreds){
		 	console.log("userCreds", userCreds);
		 	$rootScope.user = userCreds;
		 	$scope.login = {};
		 	$scope.register = {};
		 	$location.url("/list");
		 });
	};

	$scope.setLoginContainer = function(){
		$scope.loginContainer = true;
		$scope.registerContainer = false;
	};

	$scope.setRegisterContainer = function(){
		$scope.loginContainer = false;
		$scope.registerContainer = true;
	};

	$scope.registerUser = function(registerNewUser){
		console.log("registerNewUser", registerNewUser);
		AuthFactory.registerWithEmail(registerNewUser).then(function(didRegister){
			registerNewUser.uid = didRegister.uid;
			return UserFactory.addUser(registerNewUser);
		}).then(function(registerComplete){
			logMeIn(registerNewUser);
		});
	};

	$scope.loginUser = function(loginNewUser){
		console.log("loginUser", loginNewUser);
		logMeIn(loginNewUser);
	};
});
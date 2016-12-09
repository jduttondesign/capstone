"use strict";
console.log("loaded NewCtrl");

app.controller("NewCtrl", function($scope, $rootScope, $location, DonationFactory){
  	$scope.newTask = {};

	$scope.addNewItem = function(){
	  $scope.newTask.isCompleted = false;
	  $scope.newTask.uid = $rootScope.user.uid;
	  DonationFactory.postNewItem($scope.newTask).then(function(itemId){
	    $location.url("/items/list");
	    $scope.newTask = {};
	  });
  	};
});
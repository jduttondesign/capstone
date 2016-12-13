"use strict";

app.controller("DonationNewCtrl", function($scope, $rootScope, $location, DonationFactory){
  	$scope.newTask = {};

	$scope.addNewItem = function(){
	  $scope.newTask.isCompleted = false;
	  $scope.newTask.uid = $rootScope.user.uid;
	  DonationFactory.postNewItem($scope.newTask).then(function(itemId){
	    $location.url("/donation/list");
	    $scope.newTask = {};
	  });
  	};
});
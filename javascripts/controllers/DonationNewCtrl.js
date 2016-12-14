"use strict";
app.controller("DonationNewCtrl", function($scope, $rootScope, $location, DonationFactory){
  	$scope.newTask = {};

	$scope.addNewDonation = function(){
	  $scope.newTask.isCompleted = false;
	  $scope.newTask.uid = $rootScope.user;
	  
	  
	  DonationFactory.postNewDonation($scope.newTask).then(function(itemId){
	    $location.url("/donation/list");
	    $scope.newTask = {};
	  });
  	};
});
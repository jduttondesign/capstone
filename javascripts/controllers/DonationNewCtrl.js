"use strict";
app.controller("DonationNewCtrl", function($scope, $rootScope, $location, DonationFactory){
  	$scope.newTask = {};

	$scope.addNewDonation = function(){
	  $scope.newTask.pickupDate = "";
	  $scope.newTask.uid = $rootScope.user;
	  $scope.newTask.isAgreePickup = false;
	  $scope.newTask.isDelivered = false;
	  $scope.newTask.pickupId = $rootScope.user;
	  DonationFactory.postNewDonation($scope.newTask).then(function(itemId){
	    $location.url("/donation/list");
	    $scope.newTask = {};
	  });
  	};
});
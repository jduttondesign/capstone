"use strict";
app.controller("MyDonationsCtrl", function($scope, $rootScope, $location, DonationFactory){
  	$scope.newTask = {};

	$scope.addNewDonation = function(){
	  $scope.newTask.pickupDate = "";
	  $scope.newTask.uid = $rootScope.user;
	  $scope.newTask.isAgreePickup = true;
	  $scope.newTask.isDelivered = true;
	  $scope.newTask.pickupId = $rootScope.user.uid;
	  DonationFactory.postNewDonation($scope.newTask).then(function(itemId){
	    $location.url("/donation/list");
	    $scope.newTask = {};
	    
	  });
  	};
});
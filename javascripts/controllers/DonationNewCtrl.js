"use strict";
app.controller("DonationNewCtrl", function($scope, $rootScope, $location, DonationFactory){
  	$scope.newTask = {};

	$scope.addNewDonation = function(){
	  $scope.newTask.delivererId = $rootScope.user.uid;
	  console.log("$rootScope.user", $rootScope.user);
	  $scope.newTask.isAgreePickup = false;
	  $scope.newTask.isDelivered = false;
	  DonationFactory.postNewDonation($scope.newTask).then(function(itemId){
	    $location.url("/donation/list");
	    $scope.newTask = {};
	  });
  	};
});
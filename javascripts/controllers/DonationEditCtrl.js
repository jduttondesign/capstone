"use strict";

app.controller("DonationEditCtrl", function($scope, $location, $routeParams, DonationFactory){
	$scope.newTask = {};
	let donationId = $routeParams.id;

	DonationFactory.getSingleDonation(donationId).then(function(oneDonation){
		oneDonation.id = donationId;
		$scope.newTask = oneDonation;
	});

	$scope.addNewDonation = function(){
		DonationFactory.editDonation($scope.newTask).then(function(response){
			$scope.newTask = {};
			$location.url("/donation/list");			
		});
	};
});
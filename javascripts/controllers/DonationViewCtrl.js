"use strict";

app.controller("DonationViewCtrl", function($scope, $routeParams, DonationFactory){
	$scope.selectedDonation = {};
	let donationId = $routeParams.id;

	DonationFactory.getSingleDonation(donationId).then(function(oneDonation){
		oneDonation.id=donationId; console.log("test");
		$scope.selectedDonation = oneDonation;
		console.log("selectedDonation", $scope.selectedDonation);
	});
});


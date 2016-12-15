"use strict";

app.controller("DonationEditCtrl", function($scope, $location, $routeParams, DonationFactory){
	$scope.newTask = {};
	let itemId = $routeParams.id;

	DonationFactory.getSingleDonation(itemId).then(function(oneItem){
		oneItem.id = itemId;
		$scope.newTask = oneItem;
	});

	$scope.addNewItem = function(){
		DonationFactory.editDonation($scope.newTask).then(function(response){
			$scope.newTask = {};
			$location.url("/donation/list");
			//console.log("newTask", $scope.newTask);			
		});
	};
});
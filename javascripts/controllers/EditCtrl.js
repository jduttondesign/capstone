"use strict";

app.controller("EditCtrl", function($scope, $location, $routeParams, DonationFactory){
	$scope.newTask = {};
	let itemId = $routeParams.id;

	DonationFactory.getSingleItem(itemId).then(function(oneItem){
		oneItem.id = itemId;
		$scope.newTask = oneItem;
	});

	$scope.addNewItem = function(){
		DonationFactory.editItem($scope.newTask).then(function(response){
			$scope.newTask = {};
			$location.url("/donation/list");
		});
	};
});
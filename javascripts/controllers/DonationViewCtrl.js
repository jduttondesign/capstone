"use strict";

app.controller("DonationViewCtrl", function($scope, $routeParams, DonationFactory){
	$scope.selectedItem = {};
	let itemId = $routeParams.id;

	DonationFactory.getSingleItem(itemId).then(function(oneItem){
		oneItem.id=itemId;
		$scope.selectedItem = oneItem;
	});
});


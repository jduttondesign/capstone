
"use strict";

app.controller("DonationCtrl", function($scope, $routeParams, DonationFactory){
	$scope.selectedItem = {};
	let itemId = $routeParams.id;

	ItemFactory.getSingleItem(itemId).then(function(oneItem){
		oneItem.id=itemId;
		$scope.selectedItem = oneItem;
	});
});
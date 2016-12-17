"use strict";
app.controller("MyDonationsCtrl", function($scope, $rootScope, $location, DonationFactory){
  	$scope.donations = [];
  let getDonations = function(){  
    $scope.donations = [];
    DonationFactory.getDonationList($rootScope.user).then(function(fbDonations){
      fbDonations.forEach(function(oneDonation){
      	if(oneDonation.pickupId === $rootScope.user.uid){
      		$scope.donations.push(oneDonation);
      	}
      });
      
    });
  };

  getDonations();
	// $scope.addNewDonation = function(){
	//   $scope.newTask.pickupDate = "";
	//   $scope.newTask.uid = $rootScope.user;
	//   $scope.newTask.isAgreePickup = true;
	//   $scope.newTask.isDelivered = true;
	//   $scope.newTask.pickupId = $rootScope.user.uid;
	//   DonationFactory.postNewDonation($scope.newTask).then(function(itemId){
	//     $location.url("/mydonations");
	//     $scope.newTask = {};
	//   });
 //  	};
});

// In donationListCtrl and DonationViewCtrl = 
//click function to change isagreepickup=true and 
//assign $rootScope.user.id to pickupId.  Then call edit in DonationFactory
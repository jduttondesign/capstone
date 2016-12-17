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


  $scope.completeDonation = function(selectedDonation){
    console.log("selectedDonation", selectedDonation);
    selectedDonation.isDelivered = true;
    DonationFactory.editDonation(selectedDonation).then(function(response){
      getDonations();
    }); 
  };


   $scope.deleteDonation = function(donationId){
    DonationFactory.deleteDonation(donationId).then(function(response){
      getDonations();
    });
  };
  
});

"use strict";

app.controller("DonationListCtrl", function($scope, $rootScope, DonationFactory){
  $scope.donations = [];

  let getDonations = function(){  
    DonationFactory.getDonationList($rootScope.user).then(function(fbDonations){
      $scope.donations = fbDonations;

    });
  };

  getDonations();
//console.log("test");

  $scope.deleteDonation = function(donationId){
    DonationFactory.deleteDonation(donationId).then(function(response){
      getDonations();
    });
  };

  $scope.inputChange = function(thingy){
    DonationFactory.editDonation(thingy).then(function(response){
      getDonations();
    });
  };

});
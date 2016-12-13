"use strict";

app.controller("DonationListCtrl", function($scope, $rootScope, DonationFactory){
  $scope.donations = [];

  let getDonations = function(){ 
    DonationFactory.getDonationList($rootScope.user.uid).then(function(fbDonations){
      $scope.donations = fbDonations;
    });
  };

  getDonations();

  $scope.deleteDonation = function(itemId){
    DonationFactory.deleteDonation(itemId).then(function(response){
      getDonations();
    });
  };

  $scope.inputChange = function(thingy){
    DonationFactory.editItem(thingy).then(function(response){
      getDonations();
    });
  };

});
"use strict";

app.controller("DonationListCtrl", function($scope, $rootScope, DonationFactory){
  $scope.donations = [];

  let getDonations = function(){ 
    DonationFactory.getDonationList($rootScope.user.uid).then(function(fbDonations){
      $scope.donations = fbDonations;
    });
  };

  getDonations();

  $scope.deleteItem = function(itemId){
    DonationFactory.deleteItem(itemId).then(function(response){
      getItems();
    });
  };

  $scope.inputChange = function(thingy){
    DonationFactory.editItem(thingy).then(function(response){
      getDonations();
    });
  };

});
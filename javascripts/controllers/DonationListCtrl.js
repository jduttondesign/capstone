"use strict";

app.controller("DonationListCtrl", function($scope, $rootScope, DonationFactory){
  $scope.donations = [];

  console.log("hello DonationListCtrl")
  let getDonations = function(){ 
    DonationFactory.getDonationList($rootScope.user.uid).then(function(fbDonations){
      console.log("return get")
      $scope.donations = fbDonations;
    });
  };
  
  getDonations();

  $scope.deleteItem = function(itemId){
    DonationFactory.deleteItem(itemId).then(function(response){
      getDonations();
    });
  };

  $scope.inputChange = function(thingy){
    DonationFactory.editItem(thingy).then(function(response){
      getDonations();
    });
  };

// $scope.clicked = function(){   
//         $location.path('#/new');
// };

});
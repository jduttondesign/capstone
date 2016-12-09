"use strict";
console.log("loaded ListCtrl");

app.controller("ListCtrl", function($scope, $rootScope, DonationFactory){
  $scope.items = [];


// itemStorage.getItemList().then(function(itemCollection){
//         console.log("itemCollection from promise", itemCollection);
//         $scope.items = itemCollection;
//     });

  let getItems = function(){ 
    DonationFactory.getItemList($rootScope.user.uid).then(function(fbItems){
      $scope.items = fbItems;
    });
  };
  
  getItems();

  $scope.deleteItem = function(itemId){
    DonationFactory.deleteItem(itemId).then(function(response){
      getItems();
    });
  };

  $scope.inputChange = function(thingy){
    DonationFactory.editItem(thingy).then(function(response){
      getItems();
    });
  };

});
"use strict";

app.controller("ListCtrl", function($scope, $rootScope, DonationFactory){
  $scope.items = [];

  let getItems = function(){
    ItemFactory.getItemList($rootScope.user.uid).then(function(fbItems){
      $scope.items = fbItems;
    });
  };
  
  getItems();

  $scope.deleteItem = function(itemId){
    ItemFactory.deleteItem(itemId).then(function(response){
      getItems();
    });
  };

  $scope.inputChange = function(thingy){
    ItemFactory.editItem(thingy).then(function(response){
      getItems();
    });
  };

});
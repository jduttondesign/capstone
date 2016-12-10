"use strict";

app.controller("ListCtrl", function($scope, $rootScope, DonationFactory){
  $scope.items = [];
//console.log(scope);

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

 // $scope.clicked = function(){
 //       window.location = "/new";

 // }

$scope.clicked = function(){   

        $location.path('#/new');
}

});
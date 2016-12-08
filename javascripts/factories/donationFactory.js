"use strict";
var DonationApp = angular.module('DonationApp', ['firebase']);

DonationApp.controller('DonationCtrl', ['$scope', '$firebaseArray',
    function($scope, $firebaseArray) {
        
    // CREATE A FIREBASE REFERENCE
    var donationRef = new Firebase('https://capstone-32354.firebaseio.com');

    // GET Donation AS AN ARRAY
    $scope.donation = $firebaseArray(donationRef);

    // ADD Donation ITEM METHOD
    $scope.addDonation = function () {

        // CREATE A UNIQUE ID
        var timestamp = new Date().valueOf();

        $scope.donations.$add({
            id: timestamp,
            name: $scope.donationName,
            status: 'pending'
        });

        $scope.donationName = "";

    };

    // REMOVE TODO ITEM METHOD
    $scope.removeDonation = function (index, donation) {
        
        // CHECK THAT ITEM IS VALID
        if (donation.id === undefined)return;

        // FIREBASE: REMOVE ITEM FROM LIST
        $scope.donations.$remove(donation);

    };

    // MARK TODO AS IN PROGRESS METHOD
    $scope.startDonation = function (index, donation) {

        // CHECK THAT ITEM IS VALID
        if (donation.id === undefined)return;

        // UPDATE STATUS TO IN PROGRESS AND SAVE
        donation.status = 'in progress';
        $scope.donations.$save(donation);

    };

    // MARK TODO AS COMPLETE METHOD
    $scope.completeDonation = function (index, donation) {

        // CHECK THAT ITEM IS VALID
        if (donation.id === undefined)return;

        // UPDATE STATUS TO COMPLETE AND SAVE
        donation.status = 'complete';
        $scope.donations.$save(donation);
    };

}]);


// app.factory("DonationFactory", function($q, $http, FIREBASE_CONFIG){

//   var getItemList = function(userId){
//     return $q((resolve, reject) => {
//       $http.get(`${FIREBASE_CONFIG.databaseURL}/items.json?orderBy="uid"&equalTo="${userId}"`)
//         .success(function(response){
//             let items = [];
//             Object.keys(response).forEach(function(key){
//               response[key].id = key;
//               items.push(response[key]);
//             });
//           resolve(items);
//         })
//         .error(function(errorResponse){
//           reject(errorResponse);
//         });
//     });
//   };

//   var postNewItem = function(newItem){
//     return $q((resolve, reject) =>{
//       $http.post(`${FIREBASE_CONFIG.databaseURL}/items.json`,
//          JSON.stringify({
//             assignedTo: newItem.assignedTo,
//             isCompleted: newItem.isCompleted,
//             task: newItem.task,
//             uid: newItem.uid
//          })
//        )
//         .success(function(postResponse){
//           resolve(postResponse);
//         })
//         .error(function(postError){
//           reject(postError);
//         });
//     });
//   };

//   var deleteItem = function(itemId){
//     return $q((resolve, reject) => {
//       $http.delete(`${FIREBASE_CONFIG.databaseURL}/items/${itemId}.json`)
//       .success(function(deleteResponse){
//         resolve(deleteResponse);
//       })
//       .error(function(deleteError){
//         reject(deleteError);
//       });
//     });
//   };

//   var getSingleItem = function(itemId){
//     return $q((resolve, reject) => {
//       $http.get(`${FIREBASE_CONFIG.databaseURL}/items/${itemId}.json`)
//       .success(function(getSingleResponse){
//         resolve(getSingleResponse);
//       })
//       .error(function(getSingleError){
//         reject(getSingleError);
//       });
//     });
//   };

//   var editItem = function(editItem){
//     return $q((resolve, reject) =>{
//       $http.put(`${FIREBASE_CONFIG.databaseURL}/items/${editItem.id}.json`,
//          JSON.stringify({
//             assignedTo: editItem.assignedTo,
//             isCompleted: editItem.isCompleted,
//             task: editItem.task,
//             uid: editItem.uid
//          })
//        )
//         .success(function(editResponse){
//           resolve(editResponse);
//         })
//         .error(function(editError){
//           reject(editError);
//         });
//     });
//   };

//   return {getItemList:getItemList, postNewItem:postNewItem, deleteItem:deleteItem, getSingleItem:getSingleItem, editItem:editItem};
// });
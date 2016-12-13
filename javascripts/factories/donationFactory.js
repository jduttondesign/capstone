"use strict";

app.factory("DonationFactory", function($q, $http, FIREBASE_CONFIG) {

  var getDonationList = function(userId){
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/donations.json`)
        .success(function(response){
            let donations = [];
            Object.keys(response).forEach(function(key){
              response[key].id = key;
              donations.push(response[key]);
            });
          resolve(donations);
        })
        .error(function(errorResponse){
          reject(errorResponse);
        });
    });
  };
  
  var postNewDonation = function(newDonation){
    return $q((resolve, reject) =>{
      $http.post(`${FIREBASE_CONFIG.databaseURL}/donations.json`,
         JSON.stringify({
            assignedTo: newDonation.assignedTo,
            isCompleted: newDonation.isCompleted,
            task: newDonation.task,
            uid: newDonation.uid
         })
       )
        .success(function(postResponse){
          resolve(postResponse);
        })
        .error(function(postError){
          reject(postError);
        });
    });
  };

  var deleteDonation = function(itemId){
    return $q((resolve, reject) => {
      $http.delete(`${FIREBASE_CONFIG.databaseURL}/donations/${itemId}.json`)
      .success(function(deleteResponse){
        resolve(deleteResponse);
      })
      .error(function(deleteError){
        reject(deleteError);
      });
    });
  };

  var getSingleItem = function(donationId){
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/donations/${donationId}.json`)
      .success(function(getSingleResponse){
        resolve(getSingleResponse);
      })
      .error(function(getSingleError){
        reject(getSingleError);
      });
    });
  };

  var editItem = function(editDonation){
    return $q((resolve, reject) =>{
      $http.put(`${FIREBASE_CONFIG.databaseURL}/donations/${editDonation.id}.json`,
         JSON.stringify({ 
            assignedTo: editDonation.assignedTo,
            isCompleted: editDonation.isCompleted,
            task: editDonation.task,
            uid: editDonation.uid
         })
       )
        .success(function(editResponse){
          resolve(editResponse);
        })
        .error(function(editError){
          reject(editError);
        });
    });
  };

  return {
    getDonationList:getDonationList, 
    postNewDonation:postNewDonation, 
    deleteDonation:deleteDonation, 
    getSingleItem:getSingleItem, 
    editItem:editItem
  };
});
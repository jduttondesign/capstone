"use strict";

app.factory("DonationFactory", function($q, $http, FIREBASE_CONFIG) {

  var getItemList = function(userId){
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/donations.json`)
        .success(function(response){
            let items = [];
            Object.keys(response).forEach(function(key){
              response[key].id = key;
              items.push(response[key]);
            });
          resolve(items);
        })
        .error(function(errorResponse){
          reject(errorResponse);
        });
    });
  };
  
  var postNewItem = function(newItem){
    return $q((resolve, reject) =>{
      $http.post(`${FIREBASE_CONFIG.databaseURL}/donations.json`,
         JSON.stringify({
            assignedTo: newItem.assignedTo,
            isCompleted: newItem.isCompleted,
            task: newItem.task,
            uid: newItem.uid
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

  var deleteItem = function(itemId){
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

  var getSingleItem = function(itemId){
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/donations/${itemId}.json`)
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
      $http.put(`${FIREBASE_CONFIG.databaseURL}/items/${editItem.id}.json`,
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
    getItemList:getItemList, 
    postNewItem:postNewItem, 
    deleteItem:deleteItem, 
    getSingleItem:getSingleItem, 
    editItem:editItem
  };
});
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
    //console.log("William's donations",newDonation);
    return $q((resolve, reject) =>{
      $http.post(`${FIREBASE_CONFIG.databaseURL}/donations.json`,
         JSON.stringify({
            isAgreePickup: newDonation.isAgreePickup,
            isDelivered: newDonation.isDelivered,
            pickupDate: newDonation.pickupDate,
            task: newDonation.task,
            delivererId: newDonation.delivererId,
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

  var deleteDonation = function(donationId){
    return $q((resolve, reject) => {
      $http.delete(`${FIREBASE_CONFIG.databaseURL}/donations/${donationId}.json`)
      .success(function(deleteResponse){
        resolve(deleteResponse);
      })
      .error(function(deleteError){
        reject(deleteError);
      });
    });
  };

  var getSingleDonation = function(donationId){
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

  var editDonation = function(editDonation){
    console.log("editDonation", editDonation);
    return $q((resolve, reject) =>{
      // https://appname.firebase.com/donations/92309f023jf.json
      $http.put(`${FIREBASE_CONFIG.databaseURL}/donations/${editDonation.id}.json`,
         JSON.stringify({ 
            //assignedTo: editDonation.assignedTo,
            //isCompleted: editDonation.isCompleted,
            //task: editDonation.task,
            //uid: editDonation.uid

             isAgreePickup: editDonation.isAgreePickup,
             isDelivered: editDonation.isDelivered,
             pickupDate: editDonation.pickupDate,
             task: editDonation.task,
             pickupId: editDonation.pickupId

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

  // var pickupDonation = function(myDonations){
    
  //   return $q((resolve, reject) =>{
  //     $http.post(`${FIREBASE_CONFIG.databaseURL}/donations.json`,
  //        JSON.stringify({
  //           // assignedTo: myDonations.assignedTo,
  //           // isCompleted: myDonations.isCompleted,
  //           // task: myDonation.task,
  //           // uid: myDonation.uid

  //           isAgreePickup: editDonation.isAgreePickup,
  //            isDelivered: editDonation.isDelivered,
  //            pickupDate: editDonation.pickupDate,
  //            task: editDonation.task,
  //            delivererId: editDonation.delivererId
  //        })
  //      )
  //       .success(function(postResponse){
  //         resolve(postResponse);
  //       })
  //       .error(function(postError){
  //         reject(postError);

//     });
//   };
// };

  return {
    getDonationList:getDonationList, 
    postNewDonation:postNewDonation, 
    deleteDonation:deleteDonation, 
    getSingleDonation:getSingleDonation, 
    editDonation:editDonation
    
  };
});
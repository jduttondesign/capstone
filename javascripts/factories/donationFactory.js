"use strict";
var todoApp = angular.module('TodoApp', ['firebase']);


todoApp.controller('TodoCtrl', ['$scope', '$firebaseArray',
    function($scope, $firebaseArray) {
        
    // CREATE A FIREBASE REFERENCE
    var todosRef = new Firebase('https://teamtododemo.firebaseio.com/');

    // GET TODOS AS AN ARRAY
    $scope.todos = $firebaseArray(todosRef);

    // ADD TODO ITEM METHOD
    $scope.addTodo = function () {

        // CREATE A UNIQUE ID
        var timestamp = new Date().valueOf();

        $scope.todos.$add({
            id: timestamp,
            name: $scope.todoName,
            status: 'pending'
        });

        $scope.todoName = "";

    };

    // REMOVE TODO ITEM METHOD
    $scope.removeTodo = function (index, todo) {
        
        // CHECK THAT ITEM IS VALID
        if (todo.id === undefined)return;

        // FIREBASE: REMOVE ITEM FROM LIST
        $scope.todos.$remove(todo);

    };

    // MARK TODO AS IN PROGRESS METHOD
    $scope.startTodo = function (index, todo) {

        // CHECK THAT ITEM IS VALID
        if (todo.id === undefined)return;

        // UPDATE STATUS TO IN PROGRESS AND SAVE
        todo.status = 'in progress';
        $scope.todos.$save(todo);

    };

    // MARK TODO AS COMPLETE METHOD
    $scope.completeTodo = function (index, todo) {

        // CHECK THAT ITEM IS VALID
        if (todo.id === undefined)return;

        // UPDATE STATUS TO COMPLETE AND SAVE
        todo.status = 'complete';
        $scope.todos.$save(todo);
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

  var postNewItem = function(newItem){
    return $q((resolve, reject) =>{
      $http.post(`${FIREBASE_CONFIG.databaseURL}/items.json`,
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
      $http.delete(`${FIREBASE_CONFIG.databaseURL}/items/${itemId}.json`)
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
      $http.get(`${FIREBASE_CONFIG.databaseURL}/items/${itemId}.json`)
      .success(function(getSingleResponse){
        resolve(getSingleResponse);
      })
      .error(function(getSingleError){
        reject(getSingleError);
      });
    });
  };

  var editItem = function(editItem){
    return $q((resolve, reject) =>{
      $http.put(`${FIREBASE_CONFIG.databaseURL}/items/${editItem.id}.json`,
         JSON.stringify({
            assignedTo: editItem.assignedTo,
            isCompleted: editItem.isCompleted,
            task: editItem.task,
            uid: editItem.uid
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

  return {getItemList:getItemList, postNewItem:postNewItem, deleteItem:deleteItem, getSingleItem:getSingleItem, editItem:editItem};
});
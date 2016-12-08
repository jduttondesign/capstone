
// "use strict";

// app.controller("DonationCtrl", function($scope, $routeParams, DonationFactory){
// 	$scope.selectedItem = {};
// 	let itemId = $routeParams.id;

// 	DonationFactory.getSingleItem(itemId).then(function(oneItem){
// 		oneItem.id=itemId;
// 		$scope.selectedItem = oneItem;
// 	});
// });

'use strict';

angular.module('DonationApp.addPost', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/partials', {
            templateUrl: 'partials/volunteer-list.html',
            controller: 'DonationCtrl'
        });
    }]).controller('DonationCtrl', ['$scope','$firebase',function($scope,$firebase) {
        console.log("This was called.");
        $scope.AddPost = function(){
            var title = $scope.article.title;
            var post = $scope.article.post;
            var firebaseObj = new Firebase("https://capstone-32354.firebaseio.com");
            var fb = $firebase(firebaseObj);
            fb.$push({ title: title,post: post}).then(function(ref) {
                console.log(ref);
            }, function(error) {
                console.log("Error:", error);
            });

        }
    }]);
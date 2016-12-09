"use strict";
console.log("loaded NavCtrl");

app.controller("NavCtrl", function($scope){
  $scope.navItems = [
  	{
  		name:"Logout",
		url:"#/logout"
  	}, 
  	{
  		name:"All Items",
  		url:"#/donations/list"
  	}, 
  	{
  		name:"New Item",
		url:"#/donations/new"
	}
  ];
});
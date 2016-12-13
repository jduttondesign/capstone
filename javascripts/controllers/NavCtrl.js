"use strict";

app.controller("NavCtrl", function($scope){
  $scope.navItems = [
  	{
  		name:"Logout",
		url:"#/logout"
  	}, 
  	{
  		name:"All Items",
  		url:"#/donation/list"
  	}, 
  	{
  		name:"New Item",
		url:"#/donation/new"
	}
  ];
});
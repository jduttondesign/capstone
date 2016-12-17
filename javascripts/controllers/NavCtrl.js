"use strict";

app.controller("NavCtrl", function($scope){
  $scope.navItems = [
  	{
  		name:"Logout",
		url:"#/logout"
  	}, 
  	{
  		name:"Donation List",
  		url:"#/donation/list"
  	}, 
  	{
  		name:"My Donations",
		url:"#/mydonations"
	}
  ];
});
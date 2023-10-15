/**
 * 
 */

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-79244374-1', 'auto');
  ga('send', 'pageview');

/*
 * App Name- bgmModule
 * 	A module is a collection of services, directives, controllers, filters, and configuration information. 
 * Dependent modules - ngRoute
 */
var bgmApp = angular.module('bgmModule', ['ngRoute']);


bgmApp.factory('bgmFactoryService', function($http) {
	
	return {
        getData: function(dataUrl) {
        	return [];
        }
    };

});



bgmApp.service("bgmService", function($http, bgmFactoryService){

	this.songFileArray = [
		{name : "Ilayaraja 80s - Part 1", file:"data-yt/I1.json" }, 
		{name : "AR Rahman Tamil Melody - Part 1", file:"data-yt/ARR-T1.json"}, 
		{name : "AR Rahman Tamil Melody - Part 2", file:"data-yt/ARR-T2.json"}
	];

	this.songFileArray_next = [
		{name : "Ilayaraja 80s - Part 1", file:"data-yt/I1.json" }, 
		{name : "Ilayaraja 80s - Part 2", file:"data-yt/I2.json" }, 
		{name : "AR Rahman Tamil Melody - Part 1", file:"data-yt/ARR-T1.json" }, 
		{name : "AR Rahman Tamil Melody - Part 2", file:"data-yt/ARR-T2.json" },
		{name : "AR Rahman Hindi", file:"data-yt/ARR-H1.json" } 
	];

	this.projectTitle = " BGM ";
	this.songFile = null;
	this.playlistItem = null;
	this.TIMER_COUNTER = 60;

	this.teamArray = [
		{index: 1, logo:"teamALogo", name:"Team A", score: 0 },
		{index: 2, logo:"teamBLogo", name:"Team B", score: 0 }
	];

	this.videoName = null;
	this.showSongurl = null;

	//This function is used to get the json data from the backend. 
	this.getData = function(dataURL, callbackFunc) {
		$http({
			method: 'GET',
			url: dataURL,
			headers: {'source': 'BGMclient'}
	     }).success(function(data){
	        // With the data succesfully returned, call the passed callbackFunc
			callbackFunc(data);
	    }).error(function(){
	        //do nothing
	    });
	}


}); //end of bgmService

//Router configuration for the menu/links
bgmApp.config(function($routeProvider) {
	$routeProvider
	.when("/home", {
		templateUrl: "templates/playlist.html", 
		controller: "bgmController"
	})
	.when("/playgame", {
		templateUrl: "templates/playgame.html", 
		controller: "bgmController"
	})
	.when("/audioplaygame", {
		templateUrl: "templates/playgame2.html", 
		controller: "audioController"
	})
	.when("/playlist", {
		templateUrl: "templates/playlist.html", 
		controller: "bgmController"
	})
	.when("/teamsetup", {
		templateUrl: "templates/teamsetup.html", 
		controller: "bgmController"
	})
	.when("/gamesetup", {
		templateUrl: "templates/gamesetup.html", 
		controller: "bgmController"
	})
	.when("/playlistsetup", {
		templateUrl: "templates/playlistsetup.html", 
		controller: "plSetupController"
	})
	.otherwise({
		redirectTo: "/home"
	})

});






bgmApp.controller("bgmController", function($scope, $rootScope, $http, $location, bgmService) {

	//Initialize variables
	$scope.projectTitle = bgmService.projectTitle;
	$scope.showCounter = bgmService.TIMER_COUNTER;
	$scope.timerCounter = bgmService.TIMER_COUNTER;

	$scope.currentNumber = 0;
	$scope.songurl = "URL";
	$scope.songFileArray = bgmService.songFileArray;

	$scope.teamArray = bgmService.teamArray;
	$scope.teamA = bgmService.teamArray[0];
	$scope.teamB = bgmService.teamArray[1];


	$scope.setSongFile = function(fileUrl){
		bgmService.songFile = fileUrl;

		if($scope.songFile != null) {
			//Load the List of songs to be played
			$http.get($scope.songFile).success (function(data){
				bgmService.playlistItem = data;
				$scope.playlistItem = bgmService.playlistItem
			}); 
		}
	}



	$scope.playGame = function(){
		//resetting the TImerCounter if modified by user
		bgmService.TIMER_COUNTER = $scope.timerCounter;
		$location.path( "/playgame" );
	}

	//Prepare the song based on the songIndex passed from the SongArray. 
	$scope.loadSong = function(songIndex) {

		//redirect to home page, if the playlist is emplty.
		if(bgmService.playlistItem == null){
			//todo: be uncommented
			$location.path( "/home" );
		}


		$scope.playlistItem = bgmService.playlistItem;

		$scope.showVideo = false;

		var songsArray = bgmService.playlistItem;
		var songJSONObj = null;
		var sTime = "";
		var eTime = "";
		var songurl = null;
		var showSongurl = null;


		//resetting the timer counter back to initial value.
		$scope.showCounter = 0;
		//resetting videeo name, it will be revealed in showSong.
		$scope.videoName = null;

		//Get the song object from the SongArray
		if(songsArray != null) {
			if(songIndex < 0) {
			 	//reached the start of songs array
			 	songIndex = 0;
			}else if(songIndex >= songsArray.length) {
				//reached the end of songs array
				songIndex = songsArray.length-1;
			}
			songJSONObj = songsArray[songIndex];

			if(songJSONObj != null){
				//Derive the SongURL
				sTime = songJSONObj.sTime;
				eTime = songJSONObj.eTime;
				bgmService.videoName = songJSONObj.name;

				//construct the URL for the selected song to be played
				showSongurl = "https://www.youtube.com/embed/" + songJSONObj.videoId + "?version=3&autoplay=1&modestBranding=1&rel=0&start=" + sTime ;
				songurl = "https://www.youtube.com/embed/" + songJSONObj.videoId + "?version=3&autoplay=1&modestBranding=1&rel=0&start=" + sTime +"&end=" + eTime;

				$scope.songurl = songurl;
				//Set the showSongURL in the service for future use. 
				bgmService.showSongurl = showSongurl;

				//Todo: VideoId may not be required in future use. 
				$scope.videoId = songJSONObj.videoId;
			}

		}

		$scope.isPlaying = false;

		//Overwrite the songIndex
		$scope.currentNumber = songIndex;

	}


	//Start playing the selected song 
	$scope.playSong = function() {
		$scope.isPlaying = true;

		var myEl = angular.element( document.querySelector( '#player' ) );
		myEl.attr('src', $scope.songurl);
	}

	//Stop playing the selected song
	
	$scope.stopSong = function() {
		$scope.isPlaying = false;
		var myEl = angular.element( document.querySelector( '#player' ) );
		myEl.attr('src', "");
		$scope.startTimer();
	}

	$scope.showSong = function() {
		$scope.isPlaying = true;
		$scope.showVideo = true;

		var myEl = angular.element( document.querySelector( '#player' ) );
		myEl.attr('src', bgmService.showSongurl);

		$scope.videoName = bgmService.videoName;

	}

	//start the timer after song is played
	$scope.startTimer = function () {
		$scope.showCounter = bgmService.TIMER_COUNTER;
		var timerId = window.setInterval(function() {
			if ($scope.showCounter > 0) {
				//repaint the timer value 
				$scope.$apply(function(){
					$scope.showCounter-- ;
				});
			}
			else{
				//end of timer, break the loop
				clearInterval(timerId);
			}
		}, 1000);

	};


	//Initial load , setup the first song. 
	$scope.loadSong(0);

})//end of controller
;
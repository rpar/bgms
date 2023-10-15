/**
	This file manages the Mp3 version for the game. 
	Loads from the local mp3 file
 */

bgmApp.controller("audioController", function($scope, $http, $window, bgmService, bgmFactoryService ) {

	$scope.playlistItem = [];
	$scope.currentNumber = 0;
	$scope.songName = "";
	$scope.totalsongs = 0;

	$scope.songFileArray = [
		{name : "Illayaraja songs", file:"data-mp3/I1.json" }, 
		{name : "AR Rahman Songs", file:"data-mp3/ARR1.json" },
		{name : "Hariharan Songs", file:"data-mp3/hariharan.json" },
	];

	var audioCtrl;
    $scope.initAudioCtrl = function(){
        
        if(audioCtrl == null){
        	audioCtrl = $(".audioControl");
        	//audioCtrl = document.getElementById("audioControl");
        }
     }

    $scope.loadAudio = function(dataURL){
		$scope.initAudioCtrl();
		
		//resetting the currentl song number to 0
		$scope.currentNumber = 0;


		audioCtrl.trigger('load');
		//var dataURL = "data-mp3/I1.json";
		//var dataURL = "data-mp3/ARR1.json";
		//var dataURL = "data-mp3/Hariharan1/hariharan.json";

		bgmService.getData(dataURL, function(dataResponse){
			$scope.playlistItem = dataResponse;
			if($scope.playlistItem != null){
				$scope.totalsongs = $scope.playlistItem.length;
			}
		});

		$scope.loadSong($scope.currentNumber);
	}

    $scope.nextAudio = function(){
    	$scope.currentNumber++;
    	if($scope.currentNumber > $scope.totalsongs){
    		$scope.currentNumber = $scope.totalsongs;
    	}

    	$scope.loadSong($scope.currentNumber);
    }

    $scope.prevAudio = function(){
    	$scope.currentNumber--;
    	if($scope.currentNumber < 0){
    		$scope.currentNumber = 0;
    	}
    	$scope.loadSong($scope.currentNumber);
    }

	$scope.loadSong = function(songNo){

    	var songObj = $scope.playlistItem[songNo];

    	var videoURL = "";
		var sTime = 100;

		if(songObj != null){
			videoURL = songObj.videoURL;
			sTime = songObj.sTime;
			$scope.songName = songObj.name;
			$scope.showSongName = "";
			$scope.showSongName = $scope.songName ; //to be removed
		}
    	audioCtrl.prop("src", videoURL)
		audioCtrl.prop("currentTime", sTime);
		audioCtrl.prop("endTime",  audioCtrl.prop("currentTime")+10);
		audioCtrl.prop("duration",  audioCtrl.prop("currentTime")+10);
    }

	$scope.showSong = function(songNo){
		$scope.showSongName = $scope.songName ; 
	}



    $scope.playAudio = function(){
    	$scope.initAudioCtrl();

		$scope.loadSong($scope.currentNumber);
        audioCtrl.trigger('play');

		//start the timer after song is played
		var playTimeCounter = 10;

		var timerId = window.setInterval(function() {
			if (playTimeCounter > 0) {
				if(audioCtrl.prop("readyState") == 4){
					//repaint the timer value 
					playTimeCounter--;
				}
			}
			else{
				//end of timer, break the loop
				$scope.pauseAudio();
				clearInterval(timerId);
			}
		}, 1000);
    }

    $scope.pauseAudio = function(){
        audioCtrl.trigger('pause');
    }

    $scope.stopAudio = function(){
        pauseAudio();
        audioCtrl.prop("currentTime",0);
    }

    $scope.forwardAudio = function(){
        $scope.pauseAudio();
        audioCtrl.prop("currentTime", audioCtrl.prop("currentTime")+25);
        $scope.startAudio();
    }

    $scope.backAudio = function(){
        $scope.pauseAudio();
        audioCtrl.prop("currentTime",audioCtrl.prop("currentTime")-25);
        $scope.startAudio();
    }

    $scope.volumeUp = function(){
        var volume = audioCtrl.prop("volume") + 0.1;
        if(volume > 1){
            volume = 1;
        }
        audioCtrl.prop("volume",volume);
    }

    $scope.volumeDown = function(){
        var volume = audioCtrl.prop("volume") - 0.1;
        if(volume < 0){
            volume = 0;
        }
        audioCtrl.prop("volume",volume);
    }

    $scope.toggleMuteAudio = function(){
        audioCtrl.prop("muted",!audioCtrl.prop("muted"));
    }

});

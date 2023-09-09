
bgmApp.controller("plSetupController", function($scope, $http, $window, bgmService ) {


	$scope.playlistItem = [];
	$scope.currentNumber = 1;
	
	$scope.songFileArray = [
		{name : "Playlist 1", file:"data-yt/testData.json" }, 
		{name : "Playlist 2", file:"data-yt/testData.json" } 
	];

	$scope.loadSongFile = function(fileUrl){
		$scope.songFile = fileUrl;
		//$route.reload();

		if($scope.songFile != null) {
			//Load the List of songs to be played
			$http.get($scope.songFile).success (function(data){
				$scope.playlistItem = data;
				console.log(data);
			}); 
		}
	}

});

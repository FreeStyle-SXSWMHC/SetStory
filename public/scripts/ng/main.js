var myApp = angular.module('myApp', ['autocomplete', 'infinite-scroll','angularMoment','ngRoute']).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', 
    {
      templateUrl: '/scripts/ng/partials/search.html', 
      controller: 'SearchController'
    });
  $routeProvider.when('/artists/:name', 
    {
      templateUrl: '/scripts/ng/partials/artists.html', 
      controller: 'ArtistsController'
    });
}]);

myApp.controller('SearchController', function($scope,$rootScope,$location, $http){

    $rootScope.main = true;
    $rootScope.detail = false;
        $scope.artists = [];

        // gives another movie array on change
        $scope.updateArtists = function(typed){
            // MovieRetriever could be some service returning a promise
            var url = '/api/search/' + typed;
            
            $http.get(url).success(function(data) {
		    	$scope.artists = data;
		    });
            
        };
        $scope.gotoArtist = function(c){	
        	$location.path("/artists/" + c);
        };
    
});


myApp.controller('ArtistsController', function($scope,$sce,$rootScope,$routeParams,$location, $http) {
	
	$scope.choice = $routeParams.name;
	
	$scope.getArtistPhoto = function(){
		
		var url = "api/getArtistPic/" + $scope.choice; 
		
		$http.get(url).success(function(data) {
			$scope.artistsPhoto = data;
			console.log(data,$scope.choice);
		});
		
	}
	$scope.getArtistPhoto();

    $scope.getArtistData = function(){
        var url = "api/artist/" + $scope.choice;

        $http.get(url).success(function(data) {
            $scope.artistData = data;
            console.log('artist data', data);
        })

    }

    $scope.getArtistData();

	$scope.back = function(){
		$location.path("/");
	}
	var media =[];
	  $scope.sets = [];
	  $scope.page= 1;
	  // $scope.loadMore = function() {
	   
	  // };
	  // $scope.loadMore();
	$scope.showVideo = function(media){
		if (!media) return false;
		console.log(media.type);
		return media.type ==='video';
	};
	$scope.showEmbed = function(media){
		if (!media) return false;
		console.log(media.type);
		return media.type ==='embed';
	}
	$scope.showVideoUrl = function(url){
		return $sce.trustAsResourceUrl(url);
	}
	$scope.showImage = function(media){
		
		
		if (media.type === 'image')
		{
			if (parseInt(media.width) >= 700 && parseInt(media.width) <= 800){
				return true;
			}
			else return false;
		}
		else {return false; }

	};
	var url = "/api/story/"+ $scope.choice; 
	
	$http.get(url).success(function(data) {
		$scope.sets= data;
		var mockDatasetUrl = '/SkrillexSets.json';
		$http.get(mockDatasetUrl).success(function(metadata) {
			for (var i = 0; i < metadata.length; i++) {
				data[i].meta = metadata[i]
			};
		});
	});

});

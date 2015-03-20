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
  
   $routeProvider.when('/events/:name', 
    {
      templateUrl: '/scripts/ng/partials/events.html', 
      controller: 'EventsController'
    });
}]);

myApp.controller('SearchController', function($scope,$rootScope,$location, $http){

    $rootScope.main = true;
    $rootScope.detail = false;
        $scope.artists = [];
        $scope.events = [];

        // gives another movie array on changez
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

        $scope.updateEvents = function(typed){
            // MovieRetriever could be some service returning a promise
            var url = '/api/search/' + typed;
            
            $http.get(url).success(function(data) {
		    	$scope.events = data;
		    });
            
        };
        $scope.gotoEvent = function(c){	
        	$location.path("/events/" + c);
        };
    
});


myApp.controller('ArtistsController', function($scope,$sce,$filter, $rootScope,$routeParams,$location, $http) {
	
	$scope.choice = $routeParams.name;
	
	$scope.getArtistPhoto = function(){
		
		var url = "api/getArtistPic/" + $scope.choice; 
		
		$http.get(url).success(function(data) {
			$scope.artistsPhoto = data;
		});
		
	}
	$scope.getArtistPhoto();

    $scope.getArtistData = function(){
        var url = "api/artist/" + $scope.choice;

        $http.get(url).success(function(data) {
            $scope.artistData = data;
        })

    }

    $scope.getArtistData();


    $scope.getArtistScore = function() {
    	var url = '/coachellaPopularity.json';
    	console.log("fuck");

    	$http.get(url).success(function(metadata) {
    		$scope.artistScore = " - ";
    		for(var i in metadata) {
    			if(metadata[i].artist_name == $scope.choice) {
    				$scope.artistScore = Math.floor(metadata[i].popularity*1000);
    			}
    		}
    	});
    }

    $scope.getArtistScore();

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
		return media.type ==='video';
	};
	$scope.showEmbed = function(media){
		if (!media) return false;
		return media.type ==='embed';
	}
	$scope.showVideoUrl = function(url) {
		return $sce.trustAsResourceUrl(url);
	}
	$scope.showImage = function(media){
		
		if (media.type === 'image')
		{
			if (parseInt(media.width) >= 620 && parseInt(media.width) <= 800){
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
				metadata[i].genres = $filter('orderBy')(metadata[i].genres, '-count');
				data[i].meta = metadata[i];
			};
		});
	});

	$scope.choice = decodeURIComponent($scope.choice);

});
myApp.controller('EventsController', function($scope,$sce,$filter, $rootScope,$routeParams,$location, $http) {
	

	var loadData = function(url){
		$http.get(url).success(function(data) {
			
			for (var i = 0; i < data.lineup.length; i++) {
				if ( data.lineup[i].artistimageURL === 'ca6a250fc84f30e571a62286fc8c2c16c7ce64b4.png')
				{
					 data.lineup[i].artistimageURL ='';
				}
				else {
					 data.lineup[i].artistimageURL = 'http://stredm.s3-website-us-east-1.amazonaws.com/namecheap/' +  data.lineup[i].artistimageURL;	
				}

						
			};
			$scope.detail = data;
			console.log(data);
		});
	}
	if($routeParams.name.toLowerCase().indexOf('coachella') > -1){
		loadData('coachella2015.json');
	}else{
		loadData('umf2015.json');
	}
	$scope.gotoArtist = function(artist){
		var encoded = encodeURIComponent(artist.artist);
		$scope.gotoArtist = function(c){	
        	$location.path("/artists/" + encoded);
        };
	}


});

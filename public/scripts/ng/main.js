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

});
myApp.controller('EventsController', function($scope,$sce,$filter, $rootScope,$routeParams,$location, $http) {
	$scope.image = "https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=300x250&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284";
});

var myApp = angular.module('myApp', ['autocomplete', 'infinite-scroll','ngRoute']).
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
            console.log(typed);
            $http.get(url).success(function(data) {
		    	$scope.artists = data;
		    });
            
        };
        $scope.gotoArtist = function(c){	
        	$location.path("/artists/" + c);
        };
    
});


myApp.controller('ArtistsController', function($scope,$rootScope,$routeParams,$location, $http) {
	$scope.choice = $routeParams.name;
	$scope.back = function(){
		$location.path("/");
	}
	  $scope.sets = [];
	  $scope.page= 1;
	  // $scope.loadMore = function() {
	   
	  // };
	  // $scope.loadMore();
   	var url = "/api/gigs/"+ $scope.choice; 
	$http.get(url).success(function(data) {
		console.log(data);
		$scope.sets= data;
	});
});
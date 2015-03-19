var myApp = angular.module('myApp', ['autocomplete', 'infinite-scroll']);
myApp.controller('SearchController', function($scope,$rootScope, $http){

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
        	$rootScope.choice =c ; $scope.choice;
        	$rootScope.main = false;
        	$rootScope.detail = true;
        };
    
});


myApp.controller('DemoController', function($scope,$rootScope, $http) {
	$scope.back = function(){
		console.log('h');
		$rootScope.choice = '';
        $rootScope.main = true;
        $rootScope.detail = false;
	}
  // $scope.sets = [];
  // $scope.page= 1;
  // $scope.loadMore = function() {
  //   var url = "/api/artist/skrillex/"+ $scope.page + "/" + 10;
  //   $http.get(url).success(function(data) {
  //   	$scope.sets.push(data.sets[0]);
  //   	console.log(data.sets[0]);    	
  //   	$scope.page++;
  //   });
  // };
  // $scope.loadMore();
});
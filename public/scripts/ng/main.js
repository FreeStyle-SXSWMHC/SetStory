var myApp = angular.module('myApp', ['infinite-scroll']);
myApp.controller('DemoController', function($scope, $http) {
  $scope.sets = [];
  $scope.page= 1;
  $scope.loadMore = function() {
    var url = "/api/artist/skrillex/"+ $scope.page + "/" + 10;
    $http.get(url).success(function(data) {
    	$scope.sets.push(data.sets[0]);
    	console.log(data.sets[0]);    	
    	$scope.page++;
    });
  };
  $scope.loadMore();
});
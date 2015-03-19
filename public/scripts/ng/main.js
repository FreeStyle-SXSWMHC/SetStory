var myApp = angular.module('myApp', ['infinite-scroll']);

myApp.controller('ArtistController', function($scope, ArtistConcertService) {
  $scope.concerts = new ArtistConcertService();
});

myApp.run(['$rootScope', function ($rootScope) {

       //create a new instance
       new WOW().init();

    $rootScope.$on('$routeChangeStart', function (next, current) {
        //when the view changes sync wow
        new WOW().sync();
    });
}]);
// Concerts constructor function to encapsulate HTTP and pagination logic
myApp.factory('ArtistConcertService', function($http) {
  var Concerts = function() {
    this.items = [];
    this.busy = false;
    this.after = '';
    this.page =0;
    this.count = 10;
  };

  Concerts.prototype.nextPage = function() {
    if (this.busy) return;
    this.busy = true;
    

    var url = "/api/artist/skrillex/"+ this.page + "/" + this.count;
    $http.get(url).success(function(data) {
    	if (data.sets.length === 0){
    		this.busy = true;
    	}
    	else {
	      this.items.push(data.sets);

	      
	      //TODO: Check real example 
	      
	      this.busy = false;
	      this.page++;
  		}
    }.bind(this));
  };

  return Concerts;
});
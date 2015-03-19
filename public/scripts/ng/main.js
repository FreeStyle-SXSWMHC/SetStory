var myApp = angular.module('myApp', ['infinite-scroll']);

myApp.controller('ArtistController', function($scope, ArtistConcertService) {
  $scope.concerts = new ArtistConcertService();
});

// Concerts constructor function to encapsulate HTTP and pagination logic
myApp.factory('ArtistConcertService', function($http) {
  var Concerts = function() {
    this.items = [];
    this.busy = false;
    this.after = '';
  };

  Concerts.prototype.nextPage = function() {
    if (this.busy) return;
    this.busy = true;
    var count = 10;

    var url = "/api/artist/skrillex";
    $http.get(url).success(function(data) {
      this.items.push(data.sets);

      
      //TODO: Check real example 
      
      // this.busy = false;
    }.bind(this));
  };

  return Concerts;
});
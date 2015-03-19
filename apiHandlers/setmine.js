var rest = require('restler');
var setmine = {};
var api_key = 'sxsw2015';

var artists = []

setmine.init = function(callback) {

    rest.get('http://setmine.com/api/t/artists', {
        query : {}}).on('complete', function(data) {
	        console.log(data)
	        setmine.artists = data.artists
	        if(callback) {
	        	callback()
	        }
	    })

}

setmine.artists = artists

module.exports = setmine;

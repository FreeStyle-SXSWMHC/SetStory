var rest = require('restler');
var setmine = {};
var api_key = 'sxsw2015';

var artists = []

setmine.artists = []

setmine.init = function(callback) {

    rest.get('http://setmine.com/api/t/artists', {
        query : {}}).on('complete', function(data) {
        	for(var i in data.artists) {
        		setmine.artists.push(data.artists[i])
        	}
	        if(callback) {
	        	callback()
	        }
	    })

}

module.exports = setmine;

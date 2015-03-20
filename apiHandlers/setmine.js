var rest = require('restler');
var setmine = {};
var api_key = 'sxsw2015';
var jf = require('jsonfile')

var artists = []

setmine.artists = []

setmine.init = function(callback) {

    rest.get('http://setmine.com/api/t/artists', {
        query : {}
    }).on('complete', function(data) {
    	for(var i in data.artists) {
    		setmine.artists.push(data.artists[i])
    	}
        if(callback) {
        	callback()
        }
    })

}

setmine.popularity = function(artist, event, callback) {
	console.log(artist)
	console.log(event)
	rest.get("http://setmine.com/api/v/5/search", {
		query: {
			search: artist + " " + event
		}}).on('complete', function(response) {
			callback(response)
		})

}

module.exports = setmine;

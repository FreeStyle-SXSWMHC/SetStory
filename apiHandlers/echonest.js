var rest = require('restler');
var echonest = {};
var api_key = 'IDYCHAS9YZPVJQX0E';

echonest.getTrackPopularity = function(trackTitle, cb){
    // Use decibel to get all genres for a given artist
    rest.get('http://developer.echonest.com/api/v4/song/search', {
        query : {
            'title' : trackTitle,
            'format' : 'json',
            'api_key': api_key,
            'bucket': 'song_hotttnesss',
        }
    }).on('complete', function(data){
        console.log(data)
        cb(data)
    })
};

module.exports = echonest;

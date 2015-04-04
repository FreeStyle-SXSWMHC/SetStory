var rest = require('restler');
var echonest = {};
var api_key= 'QQELH8UNTWLVBRQIB';
var consumer_key= '019584e62e8fca4752f9ee885d84c050';
var shared_secret= 'RwkQVo9ASH2dSIMlR7D4fg';
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

echonest.getArtistPopularity = function(artist, cb){
    rest.get('http://developer.echonest.com/api/v4/artist/search', {
        query : {
            "api_key": api_key,
            "name": artist
        }
    }).on('complete', function(data){
        // Use matching artist's id to get popularity
        if (!data.response.artists[0]){
            cb(0);
            return 1;
        }
        else {
            var artist_id = data.response.artists[0].id;
            rest.get('http://developer.echonest.com/api/v4/artist/hotttnesss', {
                query: {
                    "api_key" : api_key,
                    "id" : artist_id
                }
            }).on('complete', function(artist_data){
                if(!artist_data) {
                    cb(0);
                    return 1;
                }
                var popularity = artist_data.response.artist.hotttnesss;
                cb({
                    "artist_name":artist,
                    "popularity":popularity
                })
                return 0;
        });
        }
    })
}

module.exports = echonest;

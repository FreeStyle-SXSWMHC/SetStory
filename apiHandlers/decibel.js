var rest = require('restler');
var decibel = {};
decibel.appId = '9425f121';
decibel.appKey = 'bfb407871363c8a369d7fa3315608af1';

// DECIBEL IS BROKEN RIGHT NOW
decibel.getArtistGenres = function(artist, cb){
    // Use decibel to get all genres for a given artist
    rest.get('https://rest.decibel.net/v3/artists/', {
        query : {'depth' : 'Genres', 'name' : artist},
        headers : {'DecibelAppID' : decibel.appId, 
                    'DecibelAppKey' : decibel.appKey}})
        .on('complete', function(data){
        // TODO: Do we want more than just the first result?
        console.log('results decibel', data.length);
        var genres = data.Results[0].Genres;
        // TODO: Map
        var cleanGenres = [];
        for (var i = 0 ; i < genres.length ; i++){
            cleanGenres.push(genres[i].Name);
        }
        cb(cleanGenres);

        return 0;
    }).on('error', function(data){
        console.log(data);
        cb(data);

        return 0;
    })
}

// DECIBEL IS BROKEN RIGHT NOW
decibel.getSongInfo = function(title,artist,cb){
    // Get all info about song
    console.log(artist);
    rest.get('https://rest.decibel.net/v3/Recordings', {
        query : {'artists' : artist, 'depth' : 'Genres'},
        headers : {'DecibelAppID' : decibel.appId, 'DecibelAppKey' : decibel.appKey}}).on('complete', function(data){

        console.log(data);
        cb(data);
    })
}



module.exports = decibel;
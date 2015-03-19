var musicgraph = {};
musicgraph.api_key = "a31ca1efc8a5661d9cdcc0935fa41724";
var rest = require('restler');

musicgraph.getSongInfo = function(artist,title,cb){
    rest.get('http://api.musicgraph.com/api/v2/track/search', {
        query: {'api_key': musicgraph.api_key, 'artist_name': artist, 'title': title, 'limit' : 1}
    }).on('complete', function(data){
        console.log(data.data);
        cb(data.data);
    });
};

musicgraph.getArtistInfo = function(artist,cb){
    rest.get('http://api.musicgraph.com/api/v2/artist/search', {
        query: {'api_key': musicgraph.api_key, 'name': artist, 'limit' : 1}
    }).on('complete', function(data){
        var id = data.data[0].id;
        rest.get('http://api.musicgraph.com/api/v2/artist/' + id, {
            query: {'api_key': musicgraph.api_key}
        }).on('complete', function(artist){
            cb(artist.data)
        })
    })
};

module.exports = musicgraph;

musicgraph.getArtistInfo('Coldplay', function(data){})
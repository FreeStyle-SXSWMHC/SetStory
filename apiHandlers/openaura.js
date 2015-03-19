var rest = require('restler');
var openaura = {};
var api_key = 'sxsw2015';

openaura.getArtistImage = function(artist, cb){
    // Use decibel to get all genres for a given artist
    rest.get('http://api.openaura.com/v1/search/artists', {
        query : {'q' : artist, 'limit' : 1, 'api_key': api_key}}).on('complete', function(data){
        var oa_artist_id = data[0].oa_artist_id;
        rest.get('http://api.openaura.com/v1/classic/artists/' + oa_artist_id, {
            query: {'id_type' : 'oa:artist_id', 'api_key' : api_key }}).on('complete', function(data){
            cb(data.profile_image.url);
        })
    })
};

openaura.getSocialFeed = function(artist, limit, offset, cb){
    rest.get('http://api.openaura.com/v1/search/artists', {
        query : {'q' : artist, 'limit' : 1, 'api_key': api_key}}).on('complete', function(data){
        var oa_artist_id = data[0].oa_artist_id;
        rest.get('http://api.openaura.com/v1/particles/artists/' + oa_artist_id, {
            // TODO: Get a particles api_key not jacked from their website example
            query: {'id_type' : 'oa:artist_id','limit' : limit, 'offset' : offset, 'api_key' : 'zlA809tV1FCxCb55n5ei0mSmbtHgvpJe' }}).on('complete', function(data){
            cb(data);
        })
    })
};



module.exports = openaura;

var rest = require('restler');
var openaura = {};
var api_key = 'sxsw2015';


openaura.getArtistImage = function(artist, cb){
    // Use decibel to get all genres for a given artist
    rest.get('http://api.openaura.com/v1/search/artists', {
        query : {'q' : artist, 'limit' : 1, 'api_key': api_key}}).on('complete', function(data){
        var oa_artist_id = data[0].oa_artist_id;
        console.log(data);
        rest.get('http://api.openaura.com/v1/classic/artists/' + oa_artist_id, {
            query: {'id_type' : 'oa:artist_id', 'api_key' : api_key }}).on('complete', function(data){
            console.log(data);
            cb(data.profile_image.url);
        })
    })
}


module.exports = openaura;
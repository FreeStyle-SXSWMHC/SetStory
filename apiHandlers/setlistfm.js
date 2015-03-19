var rest = require('restler');
var appId = 'setlistfm';
var appKey = '463c64bb-c052-49bd-9838-8c251c427668';

var setlistFM = {
    getArtistGigs: function(artist, cb){
        //Use SetList to get all artists gigs
        rest.get('http://api.setlist.fm/rest/0.1/search/setlists', {
                query:{'artistName' : artist}
            })
            .on('complete', function(data){
            console.log(data.setlists.setlist[0].venue[0].city[0].country[0].$.name);
            // cb(cleanGenres);

            // return 0;
        }).on('error', function(data){
            console.log(data);
            cb(data);

            return 0;
        })
    }
};


module.exports = setlistFM;

setlistFM.getArtistGigs('Skrillex');
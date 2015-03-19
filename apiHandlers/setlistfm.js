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
            console.log(data.setlists.setlist[2].sets[0].set[0].song[17].cover.name);
            //A gig detail
            //data.setlists.setlist
            
            //A gig song 

            //data.setlists.setlist[j].sets[0].set[0].song

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
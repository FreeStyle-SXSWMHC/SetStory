var rest = require('restler');
var appId = 'setlistfm';
var appKey = '463c64bb-c052-49bd-9838-8c251c427668';
var moment = require('moment');
var setlistFM = {
    // Make a clean output of the mess that is the setlistfm api
    getArtistGigs: function(artist, cb){
        //Use SetList to get all artists gigs
        rest.get('http://api.setlist.fm/rest/0.1/search/setlists', {
                query:{'artistName' : artist}
            })
            .on('complete', function(data){
                // Build obj
                var output = [];
                try{
                for (var i = 0 ; i < data.setlists.setlist.length ; i++){
                    var gig = {};
                    var tracks = [];
                    var current = data.setlists.setlist[i];
                    gig.location = {};
                    gig.location.city = current.venue[0].city[0].$.name;
                    gig.location.state = current.venue[0].city[0].$.state;
                    gig.location.country = current.venue[0].city[0].country[0].$.name;

                    for (var key in current.$){
                        gig[key] = current.$[key]
                    }

                    var date = moment(gig.eventDate,"DD-MM-YYYY");
                    gig.eventDate = date.utc().format();

                    if (current.sets[0]) {
                        for(var j = 0 ; j < current.sets[0].set[0].song.length ; j++){
                            var track = {};
                            var currentSong = current.sets[0].set[0].song[j];
                            if (currentSong.cover) {
                                track.originalArtist = currentSong.cover[0].$.name
                            }
                            // Not a cover -> Original
                            //console.log(currentSong.$.name);
                            track.name = currentSong.$.name
                            tracks.push(track);
                        }
                    }
                    //console.log(data.setlists.setlist[i]);
                    gig.tracks = tracks;
                    if (gig.tracks.length > 0){
                        output.push(gig);
                    }
                    
                }

            }
            catch(e){

            }
            cb(output);
        }).on('error', function(data){
            cb(data);
            return 0;
        })
    }
};


module.exports = setlistFM;

setlistFM.getArtistGigs('Skrillex', function(data){});
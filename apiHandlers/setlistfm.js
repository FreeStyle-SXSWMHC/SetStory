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
                // Build obj
                var output = [];
                for (var i = 0 ; i < data.setlists.setlist.length ; i++){
                    var gig = {};
                    var tracks = [];
                    var current = data.setlists.setlist[i];
                    for (var key in current.$){
                        gig[key] = current.$[key]
                    }
                    //console.log(gig)
                    // console.log(current);
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
                    output.push(gig);
                }
                cb(output);
        }).on('error', function(data){
            console.log(data);
            cb(data);

            return 0;
        })
    }
};


module.exports = setlistFM;
var setlistfm = require('./setlistfm');
var openaura = require('./openaura');
var _ = require('lodash');

var unified = {};

unified.story = function(artist, cb){
    setlistfm.getArtistGigs(artist, function(sets){
        openaura.getSocialFeed(artist,100,0,function(media){
            var unifiedFeed = sets;
            var numSpliced = 0;
            // For last 10 sets, splice in particles
            for (var i = 0 ; i < 10 ; i++){
                var mostRecentSet = sets[i].eventDate;
                if(mostRecentSet) {
                    mostRecentSet = mostRecentSet.substr(0,10);
                    for(var j = 0 ; j < media.particles.length ; j++) {
                        var p = media.particles[j];
                        if ((p.date.substr(0, 7) == mostRecentSet.substr(0, 7))) {
                            // Month + year matches
                            var particleDay = Number(p.date.substr(8, 2));
                            var setDay = Number(mostRecentSet.substr(8, 2));
                            if (Math.abs(particleDay - setDay) <= 1) {
                                unifiedFeed.splice(i + numSpliced, 0, p);
                                numSpliced++;
                                // Only get one social media max per set
                                break;
                            }
                        }

                    }
                }
            }
            cb(unifiedFeed);
            return 0;
        })

    })
}

module.exports = unified;
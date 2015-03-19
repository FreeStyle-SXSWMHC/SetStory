var setlistfm = require('./setlistfm');
var openaura = require('./openaura');
var moment = require('moment');

var _ = require('lodash');

var unified = {};

unified.story = function(artist, cb){
    setlistfm.getArtistGigs(artist, function(data){
        openaura.getSocialFeed(artist,250,0,function(result){
            var media = result.particles;
            for (var i = 0; i < data.length; i++) {
                var current = moment(data[i].eventDate);

                
                for (var j = media.length - 1; j >= 0; j--) {
                                    

                    var mediaDate = moment(media[j].date);
                    var daysBetween = current.diff(mediaDate, 'days',true); 
                    
                    if (daysBetween >=0 && daysBetween <= 3){
                        var newOne = media[j].media;
                              
                        
                        //Check if is smaller, not add it
                        // if (newOne.width > 600){
                            data[i].media = [];
                            data[i].media.push(newOne);  
                        // }
                        
                    }  
                };
            };

            cb(data);
            return 0;
        })

    })
}

module.exports = unified;
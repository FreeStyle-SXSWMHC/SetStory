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

                data[i].media = [];
                for (var j = media.length - 1; j >= 0; j--) {
                                    

                    var mediaDate = moment(media[j].date);
                    var daysBetween = current.diff(mediaDate, 'days',true); 
                    
                    if (daysBetween >=0 && daysBetween <= 3){
                        var newOne = media[j].media;
                              
                        //Check if is smaller, not add it
                        if (data[i].media.length ===0){
                            data[i].media.push(newOne);  
                        }
                        else {
                            // try{
                            //     for (var z = 0; z < data[i].media.length; z++) {
                            //         var currentMedia = data[i].media[z];
                            //         var newId = newOne.oa_media_id.substring(0,newOne.oa_media_id.length-4);
                            //         var currentId = data.oa_media_id.substring(0,data.oa_media_id.length-4);
                            //         var isSameImage = newId.indexOf(currentId) > -1;
                            //         var isBigger = newOne.width > currentMedia.width;
                            //         if (isSameImage && isBigger){
                            //             data[i].media.push(newOne);    
                            //         }
                                    
                            //     };
                            // }catch(e){
                            //     //console.log(e);
                            //     data[i].media.push(newOne);
                            // }

                        }
                    }  
                };
            };

            cb(data);
            return 0;
        })

    })
}

module.exports = unified;
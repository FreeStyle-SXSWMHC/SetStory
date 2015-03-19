var musicgraph = require('./musicgraph');
var setlistfm = require('./setlistfm');

setlistfm.getArtistGigs('Skrillex', function(sets){
    for (var i = 10; i < sets.length ; i++){
        if (sets[i].tracks && sets[i].tracks[0]){
            var setBPM = 0;
            var setLength = sets[i].tracks.length;
            var genres = {};
            for (var j = 0 ; j < setLength ; j++){
                var title = sets[i].tracks[j].name
                //console.log(title)

                musicgraph.getSongInfo(null, title, function(data){
                    if(data && data.length){

                        if(data[0].main_genre){
                            genres[data[0].main_genre] =  (genres[data[0].main_genre]) ? genres[data[0].main_genre] += 1 : genres[data[0].main_genre] = 1;
                            console.log(genres);
                        }
                        if (data[0].primary_tempo) {
                            setBPM += Number(data[0].primary_tempo);
                            console.log(setBPM)
                            console.log("div by ", setLength);
                        }
                    }
                });
            }
        }

    }
});


/* Output
4158.5690000000004
div by  44 = 94.51

 { 'alternative/indie': 6,
 'rap/hip hop': 6,
 jazz: 2,
 rock: 4,
 'electronica/dance': 6,
 'reggae/ska': 1,
 pop: 2,
 'classical/opera': 1 }
*/


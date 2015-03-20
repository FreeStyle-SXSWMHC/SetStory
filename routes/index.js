var express = require('express');
var router = express.Router();
var skrillex = require('../data/Skrillex.json');
var decibel = require('../apiHandlers/decibel');
var openaura = require('../apiHandlers/openaura');
var setlistFM = require('../apiHandlers/setlistfm');
var unified = require('../apiHandlers/unified');
var musicgraph = require('../apiHandlers/musicgraph');
var setmine = require('../apiHandlers/setmine')
var echonest = require('../apiHandlers/echonest')


var jf = require('jsonfile')

setmine.init(function() {
})

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/api/search/:name', function(req, res, next) {

    if(req.params.name == "Ultra Music Festival 2015") {
        jf.readFile('../data/umf2015.json', function(err, obj) {
            res.json(obj.event)
        })
    }

    var result = [];

    if(req.params.name.length > 2) {
        var artists = setmine.artists
        for (var i = 0; i < artists.length; i++) {
            if (artists[i].artist.toLowerCase().indexOf(req.params.name.toLowerCase()) > -1) {
                result.push(artists[i].artist)
            }
        };
    }
    res.json(result)


});

router.get('/api/artist/:artistName/:page/:count', function(req, res, next){
    // TODO: Make dynamic
    if (parseInt(req.params.page) > 5){
        res.json({sets:[]});
    }
    else{
        res.json(skrillex);
    }

});

router.get('/api/artist/:artistName', function(req,res,next){
    musicgraph.getArtistInfo(req.params.artistName, function(data){
        res.json(data);
    });
});

router.get('/api/getArtistPic/:artistName', function(req, res, next){
    openaura.getArtistImage(req.params.artistName, function(data){
        res.json(data);
    })
})


router.get('/api/genres/:artistName', function(req, res, next){
    try{
        decibel.getArtistGenres(req.params.artistName, function(data){
            res.json(data);
        });
    } catch(e){
        console.log(e);

    }
});

router.get('/api/songInfo', function(req, res, next){
    musicgraph.getSongInfo(req.query.artist,req.query.title, function(data){
        res.json(data);
    })
});

router.get('/api/gigs/:artistName', function(req, res, next){
    setlistFM.getArtistGigs(req.params.artistName, function(data){
        res.json(data);
    })
});

router.get('/api/getSocialMedia', function(req, res, next){
    openaura.getSocialFeed(req.query.artist,req.query.limit ,req.query.offset,function(data){
        res.json(data);
    })
})

router.get('/api/story/:artistName', function(req, res, next){
    unified.story(req.params.artistName, function(data){
        res.json(data);
    })
})

router.get('/api/popularity/set/:artist/:event', function(req, res, next){
    setmine.popularity(req.params.artist, req.params.event, function(data) {
        res.json(data);
    })
})

router.get('/api/popularity/track/:trackTitle', function(req, res, next){
    echonest.getTrackPopularity(req.params.trackTitle, function(data) {
        res.json(data);
    })
})

module.exports = router;
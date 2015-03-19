var express = require('express');
var router = express.Router();
var skrillex = require('../data/Skrillex.json');
var decibel = require('../apiHandlers/decibel');
var openaura = require('../apiHandlers/openaura');
var setlistFM = require('../apiHandlers/setlistfm');
var unified = require('../apiHandlers/unified');
var musicgraph = require('../apiHandlers/musicgraph');
var setmine = require('../apiHandlers/setmine')

setmine.init(function() {
    console.log("Artists retrieved successfully.")
    console.log(setmine.artists)
})

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/api/search/:name', function(req, res, next) {

    //TODO: Make it dynamic
    
    var artists = setmine.artists();
    console.log(setmine.artists[100])
    var result = [];
    for (var i = 0; i < artists.length; i++) {
        if (artists[i].artist.toLowerCase().indexOf(req.params.name.toLowerCase())> -1) {
            result.push(artists[i])
        }
    };
    
    res.json(result);
    
    
});
router.get('/api/artist/:artistName/:page/:count', function(req, res, next){
    // TODO: Make dynamic
    console.log(req.params.page);
    console.log(req.params.artistName);
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
    }catch(e){
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

module.exports = router;

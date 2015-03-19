var express = require('express');
var router = express.Router();
var skrillex = require('../data/Skrillex.json');
var decibel = require('../apiHandlers/decibel');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/api/artist/:artistName', function(req, res, next){
    // TODO: Make dynamic
    res.json(skrillex);
});

router.get('/api/genres/:artistName', function(req, res, next){
    decibel.getArtistGenres(req.params.artistName, function(data){
        res.json(data);
    })
});

router.get('/api/songInfo', function(req, res, next){
    decibel.getSongInfo(req.query.title,req.query.artist, function(data){
        console.log('hi');
        console.log(data);
        res.json(data);
    })
});

module.exports = router;

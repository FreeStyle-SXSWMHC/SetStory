var express = require('express');
var router = express.Router();
var skrillex = require('../data/Skrillex.json');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/api/artist/:artistName', function(req, res, next){
    // TODO: Make dynamic
    res.json(skrillex);
});

module.exports = router;

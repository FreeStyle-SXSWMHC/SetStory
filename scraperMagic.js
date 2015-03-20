var echonest = require('./apiHandlers/echonest');

var coach = require('./public/coachella2015');
var rest = require('restler');

var lineup = coach.lineup;

function part1(){
    for (var i = 20 ; i < 40; i++){
        rest.get('http://localhost:3000/api/popularity/artist/' + lineup[i].artist).on('complete', function(data){
            console.log(data);
        });
    }
}

part1();

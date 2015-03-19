var Gracenote = require("node-gracenote");
var clientId = "2292736-55EB2C31A4AE058DED55EE4FEE44B7AB";
var clientTag = "55EB2C31A4AE058DED55EE4FEE44B7AB";
var userId = "279879629522464417-6C63D17EAF649F41DC8596BEC6C53698";
var api = new Gracenote(clientId,clientTag,userId);


api.searchTrack(null, null, "take u there", function(err, result){
    if(err){
        console.log(err);
    } else{
        console.log(result);
    }
})
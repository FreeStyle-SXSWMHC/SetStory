var Gracenote = require("node-gracenote");
var api = new Gracenote(clientId,clientTag,userId);


api.searchTrack(null, null, "take u there", function(err, result){
    if(err){
        console.log(err);
    } else{
        //console.log(result);
    }
})

var fs = require("fs");
var https = require("https");

var options = {
    host: "en.wikipedia.org",
    path: "/wiki/George_Washington",
    port: 443,
    method: "GET"
};

var req = https.request(options, function(res){

        var reqBody = "";
        console.log(res.statusCode);
        res.setEncoding("UTF-8");
        res.on("data", function(chunk){
            reqBody += chunk;
        }); 
        res.on("end", function(){
            fs.writeFile("george-washington.html", reqBody, function(err){
                if (err){
                    throw err;
                }
                console.log("Downloading file completed");
            })
        });
});

req.on("error", function(err){
    console.log(`Error occurred during request ${err.message}`);
});

req.end();
//

var http = require("http");
var fs = require("fs");
const { dir } = require("console");


var server = http.createServer(function(req, res){
    res.write("Eriting");
    res.end("end");
});
server.listen(80);
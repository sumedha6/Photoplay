var express = require("express");
var app = express();
var rooms = require("./data/rooms.json");
var bodyParser = require("body-parser");
var uuid = require("node-uuid");
var _ = require("lodash");

app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.render("index.html", { title: "Home" });
});

app.post('/', function(req, res) {
    var room = {
        name: req.body.name,
        id: uuid.v4()
    };
    rooms.push(room);
    res.json(room);
    ///  res.redirect(__dirname + '/public/upload.html');
});

// app.get('/upload', function(req, res) {
//     res.sendFile(__dirname + '/public/upload.html');
// });
app.listen(3000, function() {
    console.log('listening on port 3000!');
});

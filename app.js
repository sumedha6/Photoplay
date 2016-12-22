var express = require("express");
var app = express();
var rooms = require("./data/rooms.json");
var bodyParser = require("body-parser");
var uuid = require("node-uuid");
var _ = require("lodash");

<<<<<<< HEAD
app.set("views", "./public");
app.set('view engine', 'html');
app.set('view engine', 'ejs');
//app.use(express.static("public"));

=======
>>>>>>> befcfc5b1dde121b0757d291c6fe3296433678b2
app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.render("index.html", { title: "Home" });
});

app.post('/upload', function(req, res) {
<<<<<<< HEAD
    var room = {
        name: req.body.data,
        id: uuid.v4()
    };
    rooms.push(room);

    res.redirect('/');
    res.render("upload", { title: "upload" });
    res.render('search.ejs', output);
});
=======
>>>>>>> befcfc5b1dde121b0757d291c6fe3296433678b2

    res.redirect(__dirname + '/public/upload.html');
});

// app.get('/upload', function(req, res) {
//     res.sendFile(__dirname + '/public/upload.html');
// });
app.listen(3000, function() {
<<<<<<< HEAD
    console.log('Chat app listening on port 3000!');
});
=======
    console.log('listening on port 3000!');
});
>>>>>>> befcfc5b1dde121b0757d291c6fe3296433678b2

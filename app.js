var express = require("express");
var app = express();
var rooms = require("./data/rooms.json");
var bodyParser = require("body-parser");
var uuid = require("node-uuid");
var _ = require("lodash");

app.set("views", "./public");
app.set('view engine', 'html');
app.set('view engine', 'ejs');
//app.use(express.static("public"));

app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.render("index.html", { title: "Home" });
});

app.post('/upload', function(req, res) {
    var room = {
        name: req.body.data,
        id: uuid.v4()
    };
    rooms.push(room);

    res.redirect('/');
    res.render("upload", { title: "upload" });
    res.render('search.ejs', output);
});

app.get('/upload', function(req, res) {
    res.render("index.html", { title: "upload" });
});

// app.get('/admin/rooms', function(req, res) {
//     res.render("rooms", {
//         title: "Admin Rooms",
//         rooms: rooms
//     });
// });

// app.get('/admin/rooms/add', function (req, res) {
//     res.render("add");
// });

// app.post('/admin/rooms/add', function (req, res) {
//     var room = {
//         name: req.body.name,
//         id: uuid.v4()
//     };

//     rooms.push(room);

//     res.redirect("/admin/rooms");
// });

// app.get('/admin/rooms/edit/:id', function(req, res){
//     var roomId = req.params.id;

//     var room = _.find(rooms, r => r.id === roomId);
//     if(!room){
//         res.sendStatus(404);
//         return;
//     }

//     res.render("edit", { room });
// });

// app.post('/admin/rooms/edit/:id', function (req, res) {
//     var roomId = req.params.id;

//     var room = _.find(rooms, r => r.id === roomId);
//     if(!room){
//         res.sendStatus(404);
//         return;
//     }

//     room.name = req.body.name;

//     res.redirect("/admin/rooms");
// });

// app.get('/admin/rooms/delete/:id', function(req, res){
//     var roomId = req.params.id;

//     rooms = rooms.filter(r => r.id !== roomId);

//     res.redirect("/admin/rooms");
// });

app.listen(3000, function() {
    console.log('Chat app listening on port 3000!');
});

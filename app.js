var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var bodyparser = require('body-parser');
var uuid = require('node-uuid');
var emotions = './data/emotions.json';
var jsonfile = require('jsonfile');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var mongo = require('mongodb');
var Grid = require('gridfs-stream');
var url = 'mongodb://localhost:27017/photoplay';
var db = new mongo.Db('photoplay', new mongo.Server("127.0.0.1", 27017));
var gfs = Grid(url, mongo);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.json({ strict: false }));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});



app.post('/', function(req, res) {
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/public/images');

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name));
        // res.sendfile(form.uploadDir)
    });

    // console.log("My File",file.name)

    // log any errors that occur
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
        res.end('success');
    });

    // parse the incoming request containing the form data
    form.parse(req);


});


app.get('/upload', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/upload.html'));
});




app.post('/upload', function(req, res) {
    console.log("req", req.body);
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //HURRAY!! We are connected.
            console.log('Connection established to', url);

            // do some work here with the database.

            var emotion = {
                emotions: req.body.emotion,
                name: req.body.name,
                id: uuid.v4(),
            };
            // var emotion = {
            //     emotions: req.body,
            //     id: uuid.v4(),
            // };


            var collection = db.collection('photoplay');
            collection.insert(emotion, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "scores" collection. The documents inserted with "_id" are:', result.length, result);
                }
            });

            res.json(emotion);
            db.close();
        }
    });


});
app.get('/view', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/view.html'));

});
var server = app.listen(3000, function() {
    console.log('Server listening on port 3000');
});

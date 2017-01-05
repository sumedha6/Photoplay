var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var bodyparser = require('body-parser');
var uuid = require('node-uuid');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var dir = require('node-dir');

var url = 'mongodb://localhost:27017/photodb';

app.use(express.static('public'));
app.use(bodyparser.json({ strict: false }));
app.use(bodyparser.text());
app.use(bodyparser.urlencoded({ extended: true }));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));

});


var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/photodb';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");


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
        // res.sendFile(path.join(__dirname, 'public/upload.html'));
        res.sendFile(path.join(__dirname, 'public/images/angry.jpg'));
    });

    app.post('/upload', function(req, res) {
        console.log("req", req.body);

        var emotion = {
            emotions: req.body.emotion,
            name: req.body.name,
            id: uuid.v4(),
        };
        MongoClient.connect(url, function(err, db) {
            var collection = db.collection('photo');
            collection.insert(emotion, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "scores" collection. The documents inserted with "_id" are:', result.length, result);
                }
            });
        });

        res.json(emotion);

    });


    app.get('/view', function(req, res) {
        res.sendFile(path.join(__dirname, 'public/view.html'));

    });
    var files

    app.get('/view-images', function(req, res) {
        const testFolder = './public/images';
        // var files
        fs.readdir(testFolder, (err, files) => {
            files.forEach(file => {
                console.log('Myfiles', file);

            });
            res.json(files);
        })
    });


    app.post('/quotes/:name', function(req, res) {
        var name = '';
        name = req.params.name;
        var str = '';
        var data = '';
        console.log("Nmae", name)
            // var name = req.params.name;
        var value = req.params.emotions;
        console.log("value", value);
        var query = { "name": name };
        // query[name] = value;
        MongoClient.connect(url, function(err, db) {
            var cursor = db.collection('photo').find(); //, function(err, doc) {
            cursor.each(function(err, doc) {
                //   console.log("hey ya i wanna get closer to you", doc.name, name);
                if (doc != null) {
                    if (doc.name == req.params.name) {
                        str = str + doc.emotions + ',';
                        console.log("hey ya i wanna get closer to you", doc.name, name, req.params.name);
                        console.log("TYPE OF NAMW", typeof(doc.name), typeof(req.params.name))

                        console.log("doc::::", str); //doc, query, str);
                    }
                }
            });
            console.log("strstr::", str)
            sendResponse(str);
            console.log("::namegfdfh::", str);

        });

        res.send(data);
        console.log(":::::data:::::", data);

        //  res.send(name);

    });

    function sendResponse(str) {
        // res.json(JSON.stringify(str));

        console.log(":::::::strdata:::::", str);
    }

    app.post('/search', function(req, res) {
        var search = req.body;
        var key = '';
        var str = '';
        for (var i in search) {
            key = i;
            console.log("::key", key, typeof(key))
        }
        console.log(search, typeof(search));
        console.log("::key::::", key, typeof(key))


        MongoClient.connect(url, function(err, db) {
            var cursor = db.collection('photo').find(); //, function(err, doc) {
            cursor.each(function(err, doc) {
                //   console.log("hey ya i wanna get closer to you", doc.name, name);
                if (doc != null) {
                    if (doc.emotions === key) {

                        console.log("hey u :::", doc.emotions, ":::key:::", key);
                        //  if (doc.emotions === key) {

                        str = str + doc.name + ',';
                        console.log("hey ya i wanna get closer to you", doc.emotions, search);
                        console.log("doc::::", str); //doc, query, str);
                    }
                }
            });
            console.log("strstrsearchkdhfkd::", str) res.send(str);

        });


    });


    db.close();
});

var server = app.listen(3000, function() {
    console.log('Server listening on port 3000');
});

"use strict"

var path=require("path");
var express = require("express"),
    http = require("http"),
    // import the mongoose library
    mongoose = require("mongoose"),
    app = express(),
    bodyParser = require('body-parser');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(express.static(path.join(__dirname, 'public')));


// connect to the amazeriffic data store in mongo
mongoose.connect('mongodb://localhost/gradproject');

// This is our mongoose model for trackdb
var ActorsSchema = mongoose.Schema({
    "actorname": String,
    "starred" : Boolean
});

var ActorsDB = mongoose.model("actorsdb", ActorsSchema);

//http.createServer(app).listen(3000);
app.listen(3000, function(){
     console.log('GradProject: Listeninng on 3000');
});

// Read from mongo db
app.get("/actors", function (req, res) {
    ActorsDB.find({}, function (err, Actors) {
        if (err !== null) {
            console.log("Error : ", err);
        } else {
            console.log("Found database");
            res.json(Actors);
        }
    });
});

// Add entry to mongo db
app.post("/actors", function (req, res) {
    console.log(req.body);
    var actor = new ActorsDB({"actorname" : req.body.actorname, "starred": false});
    actor.save(function (err, result) {
    if (err !== null) {
        // the element did not get saved!
        console.log(err);
        res.send("ERROR");
    } else {
        // our client expects *all* of the todo items to be returned, so we'll do
        // an additional request to maintain compatibility
        ActorsDB.find({}, function (err, result) {
            if (err !== null) {
                // the element did not get saved!
                res.send("ERROR");
            }
            console.log("Actor added!");
            res.json(result);
        });
    }
    });
});


// Update entry to mongo db
app.post("/starred", function (req, res) {
    console.log("started", req.body);

    if (req.body.starred === "true") {
        ActorsDB.findOneAndUpdate({"actorname" : req.body.actorname}, {$set : {"starred" : false}}, function(err, actor) {
            if (err !== null) {
                 // the element did not get saved!
                console.log(err);
                res.send("ERROR");
            } else {
                console.log("Actor starred status update to false");
                res.json(actor);
            }
        });
    } else {
        ActorsDB.findOneAndUpdate({"actorname" : req.body.actorname}, {$set : {"starred" : true}}, function(err, actor) {
            if (err !== null) {
                 // the element did not get saved!
                console.log(err);
                res.send("ERROR");
            } else {
                console.log("Actor starred status updated to true");
                res.json(actor);
            }
        });
    }
});

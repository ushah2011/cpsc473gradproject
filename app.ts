import * as http from "http";
import * as url from "url";
import * as express from "express";
import * as bodyParser from "body-parser";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");

import * as routes from "./routes/index";
import * as db from "./db";

var app = express();

// Configuration

// app.set('views', __dirname + '/views');
// app.set('view engine', 'jade');
// app.set('view options', { layout: false });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));

app.get('/actors', function(req, res) {
    db.getActors(Actors => { 
        console.log(Actors);
        res.send(Actors); });
    });

app.post('/actors', (req, res) => {
    console.log(req.body.actorname);
    db.addActor(req.body.actorname, Actor => {
        console.log(Actor);
        res.send(Actor);
    });
});

app.post('/starred', (req, res) => {
    console.log(req.body.actorname);
    console.log(req.body.starred);
    db.updateActor(req.body.actorname, req.body.starred, Actor => {
        console.log(Actor);
        res.send(Actor);
    });
});

app.listen(3000, function(){
    console.log("Grad Project server listening on port %d", 3000);
});

export var App = app;
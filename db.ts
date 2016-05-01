// Mongo
import mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017, {auto_reconnect: true})
var db = new mongodb.Db('gradproject', server, { w: 1 });
db.open(function() {});

export interface Actor {
    actorname: string;
    starred: boolean;
}


export function getActors(callback: (actors: Actor[]) => void) {
    db.collection('actorsdbs', function(error, actors_collection) {
        if(error) { console.error(error); return; }
        actors_collection.find().toArray(function(error, actorobjs) {
           if(error) { console.error(error); return; }
           callback(actorobjs);
        });
    });
}

export function addActor(actorname: string, callback: (actors: Actor) => void) {
    db.collection('actorsdbs', function(error, actors_collection) {
        if(error) { console.error(error); return; }
        actors_collection.insert( {
                                    "actorname": actorname,
                                    "starred": false
                                    }, 
              function(error, actor) {
              if(error) { console.error(error); return; }
              callback(actor);
        });
    });
}

export function updateActor(actorname: string, starred: string, 
                                    callback: (actors: Actor) => void) {
    db.collection('actorsdbs', function(error, actors_collection) {
        if(error) { console.error(error); return; }
        if (starred == "true") {            
            actors_collection.findOneAndUpdate( {
                                        "actorname": actorname
                                        }, {$set : {"starred" : false}},
                  function(error, actor) {
                  if(error) { console.error(error); return; }
                  callback(actor);
            });            
        } else {
            actors_collection.findOneAndUpdate( {
                                        "actorname": actorname
                                        }, {$set : {"starred" : true}},
                  function(error, actor) {
                  if(error) { console.error(error); return; }
                  callback(actor);
            });
        };
    });
};

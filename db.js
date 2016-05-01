"use strict";
// Mongo
var mongodb = require('mongodb');
var server = new mongodb.Server('localhost', 27017, { auto_reconnect: true });
var db = new mongodb.Db('gradproject', server, { w: 1 });
db.open(function () { });
// export interface User {
//     _id: string;
//     email: string;
//     first_name: string;
//     last_name: string;
//     fbId: number;
//     boards: Board[];
// }
// export interface Board {
//     title: string;
//     description: string;
//     images: mongodb.ObjectID[];
// }
// export interface Image {
//     _id: mongodb.ObjectID;
//     user: string;
//     caption: string;
//     imageUri: string;
//     link: string;
//     board: string;
//     comments: {text: string; user: string;}[];
// }
// This is our mongoose model for trackdb
// var ActorsSchema = mongoose.Schema({
//     "actorname": String,
//     "starred" : Boolean
// });
// var ActorsDB = mongoose.model("actorsdb", ActorsSchema);
// export function getActorsM()
function getActors(callback) {
    db.collection('actorsdbs', function (error, actors_collection) {
        console.log("found database");
        //console.log(actors_collection);
        if (error) {
            console.error(error);
            return;
        }
        // actors_collection.find({}, function(error, Actors) {
        //    if(error) { console.error(error); return; }
        //    callback(Actors);
        // });
        actors_collection.find({}).toArray(function (error, actorobjs) {
            if (error) {
                console.error(error);
                return;
            }
            callback(actorobjs);
        });
    });
}
exports.getActors = getActors;
function addActor(actorname, callback) {
    db.collection('actorsdb', function (error, actors_collection) {
        if (error) {
            console.error(error);
            return;
        }
        actors_collection.insert({
            actorname: actorname,
            starred: false
        }, function (error, actor) {
            callback(actor);
        });
    });
}
exports.addActor = addActor;
function updateActor(actorname, starred, callback) {
    db.collection('actorsdb', function (error, actors_collection) {
        if (error) {
            console.error(error);
            return;
        }
        if (starred == "true") {
            actors_collection.findOneAndUpdate({
                actorname: actorname
            }, { $set: { starred: false } }, function (error, actor) {
                callback(actor);
            });
        }
        else {
            actors_collection.findOneAndUpdate({
                actorname: actorname
            }, { $set: { starred: true } }, function (error, actor) {
                callback(actor);
            });
        }
        ;
    });
}
exports.updateActor = updateActor;
;
// export function getUser(id: string, callback: (user: User) => void) {
//     db.collection('users', function(error, users) {
//         if(error) { console.error(error); return; }
//         users.findOne({_id: id}, function(error, user) {
//            if(error) { console.error(error); return; }
//            callback(user);
//         });
//     });
// }
// export function getUsers(callback: (users: User[]) => void) {
//     db.collection('users', function(error, users_collection) {
//         if(error) { console.error(error); return; }
//         users_collection.find({}, { '_id': 1 }).toArray(function(error, userobjs) {
//            if(error) { console.error(error); return; }
//            callback(userobjs);
//         });
//     });
// }
// export function getImage(imageId: string, callback: (image: Image) => void) {
//     db.collection('images', function(error, images_collection) {
//         if(error) { console.error(error); return; }
//         images_collection.findOne({_id: new mongodb.ObjectID(imageId)}, function(error, image) {
//             if(error) { console.error(error); return; }
//             callback(image);
//         });
//     });
// }
// export function getImages(imageIds: mongodb.ObjectID[], callback: (images: Image[]) => void) {
//     db.collection('images', function(error, images_collection) {
//         if(error) { console.error(error); return; }
//         images_collection.find({_id: {$in: imageIds}}).toArray(function(error, images) {
//             callback(images);
//         });
//     }); 
// }
// export function addBoard(userid: any, title: string, description: string, callback: (user: User) => void) {
//     db.collection('users', function(error, users) {
//         if(error) { console.error(error); return; }
//         users.update(
//             {_id: userid}, 
//             {"$push": {boards: { title: title, description: description, images: []}}}, 
//             function(error, user) {
//                 if(error) { console.error(error); return; }
//                 callback(user);
//             }
//         );
//     });
// }
// export function addPin(userid: string, boardid: string, imageUri: string, link: string, caption: string, callback: (user: User) => void) {
//     db.collection('images', function(error, images_collection) {
//         if(error) { console.error(error); return; }
//         images_collection.insert({
//             user: userid,
//             caption: caption,
//             imageUri: imageUri,
//             link: link,
//             board: boardid,
//             comments: []
//         }, function(error, image) {
//             console.log(image);
//             db.collection('users', function(error, users) {
//                 if(error) { console.error(error); return; }
//                 users.update(
//                     {_id: userid, "boards.title": boardid}, 
//                     {"$push": {"boards.$.images": image[0]._id}},
//                     function(error, user) {
//                         callback(user);
//                     }
//                 );
//             })
//         })
//     })
// }
//# sourceMappingURL=db.js.map
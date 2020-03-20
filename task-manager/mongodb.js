//CRUD operations for MongoDB

const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
//const ObjectID = mongodb.ObjectID;

const connectionUrl = 'mongodb://localhost:27017';
const databaseName = 'task-manager';

//Using object Id 
// const id = new ObjectID();
// console.log(id.getTimestamp());

mongoClient.connect(connectionUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    if (error){
        return console.log('Unable to connect to database');
    }

    const db = client.db(databaseName);

    //Insert one document
    // db.collection('users').insertOne({
    //     name : 'Ted',
    //     age : 29
    // },(error, result) => {
    //     if (error){
    //         return console.log('Unable to insert to database');
    //     }
    //     console.log(result.ops);
    // });

    //Insert many documents
    // db.collection('users').insertMany([
    //     {
    //         name : 'Kostas',
    //         age: 36
    //     },
    //     {
    //         name : 'Mary',
    //         age: 40
    //     }
    // ],(error, result) => {
    //     if (error){
    //          return console.log('Unable to insert to database');
    //         }
    //     console.log(result.ops);
    // })

    //Fetching data - one 
    db.collection('users').findOne({name:'Kostas'}, (error, user) => {
        if (error){
            return console.log('Unable to fetch user');
        }
        console.log(user);
    });

    //Fetching data - many 
    db.collection('users').find({name:'Ted'}).toArray((error, users) => {
        console.log(users);
    });
});
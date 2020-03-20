//CRUD operations for MongoDB

const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

const connectionUrl = 'mongodb://localhost:27017';
const databaseName = 'task-manager';

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
    db.collection('users').insertMany([
        {
            name : 'Kostas',
            age: 36
        },
        {
            name : 'Mary',
            age: 40
        }
    ],(error, result) => {
        if (error){
             return console.log('Unable to insert to database');
            }
        console.log(result.ops);
    })
});
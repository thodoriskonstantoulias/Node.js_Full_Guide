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
    db.collection('users').insertOne({
        name : 'Ted',
        age : 29
    });
});
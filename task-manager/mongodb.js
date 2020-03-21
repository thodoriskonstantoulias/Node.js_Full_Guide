//CRUD operations for MongoDB

const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

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
    // db.collection('users').findOne({name:'Kostas'}, (error, user) => {
    //     if (error){
    //         return console.log('Unable to fetch user');
    //     }
    //     console.log(user);
    // });

    //Fetching data - many 
    // db.collection('users').find({name:'Ted'}).toArray((error, users) => {
    //     console.log(users);
    // });

    //Updating documents -- with Promises instead of callbacks
    // const updatePromise = db.collection('users').updateOne({_id : new ObjectID('5e75287755be3c11a0926698') }, 
    // {
    //     $set : {
    //         name: 'Ted'
    //     }
    // });

    // updatePromise.then((result) => {
    //     console.log(result);
    //     console.log('Updated');
    // }).catch((error) => {
    //     console.log(error);
    // });

    // const updatePromises = db.collection('users').updateMany({name: 'Ted'},
    // {
    //     $set : {
    //         name : 'Ted3'
    //     }
    // });

    // updatePromises.then((result) => {
    //     console.log(result);
    //     console.log('Updated many');
    // }).catch((error) => {
    //     console.log(error);
    // });

    //Deleting documents
    db.collection('users').deleteOne({name:'Kostas'})  //deleteMany is similar
      .then((result) => {
          console.log('Deleted');
      }).catch((error) => {
          console.log(error);
      })
});
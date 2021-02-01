//import all packages
const mongoclient = require('mongodb').MongoClient;
const assert = require('assert');

const dboper = require('./dboperations');

//define constants to be used
const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

//connecting to mongodb. can only be performed when mongodb server is up and running in cmd
mongoclient.connect(url, {useUnifiedTopology:true}).then((client) => {
    console.log('Connected correctly to server');
    const db = client.db(dbname);

    dboper.insertDocument(db, {name:"Vadonut", description:"test"}, 'dishes')
    .then((result) => {
        console.log('Insert Document: \n', result.ops);
        return dboper.findDocuments(db, 'dishes');
    })
    .then((docs) => {
        console.log('Found documents: \n' , docs );
        return dboper.updateDocument(db, {name: "Vadonut"}, {description : "Updated Test"}, 'dishes');
    })
    .then((result) => {
        console.log('Updated Document: \n' , result.result);
        return dboper.findDocuments(db, 'dishes');
    })
    .then((docs) => {
        console.log('Found documents: \n' , docs );
        return db.dropCollection('dishes');
    })
    .then((result) => {
    console.log('Dropped Collection: \n' , result);
    client.close();
    })
    .catch((err) => console.log(err));
})
.catch((err) => console.log(err));

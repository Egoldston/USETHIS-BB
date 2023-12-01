// const MongoClient = require('mongodb').MongoClient;
// const url         = 'mongodb://localhost:27017';
// // const url         = 'mongodb://localhost:5000';
// let db            = null;
 
// // connect to mongo
// MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
//     if(err)
//     {
//         console.log("**************", err);
//     } else {
//         console.log("Connected successfully to db server");

//         // connect to myproject database
//         //db = client.db('myproject');
//         db = client;
//     }
// });


const { MongoClient } = require('mongodb');

// Connection URI for MongoDB Atlas
const uri = 'mongodb+srv://elizabethjgoldston:Gold123@cluster0.2dmddjz.mongodb.net/?retryWrites=true&w=majority'; // Replace with your actual connection URI from MongoDB Atlas
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db; // MongoDB database instance

async function connectToDB() {
    try {
      await client.connect();
      console.log('Connected to MongoDB Atlas');
      db = client.db('badbanking-app'); // Replace 'your_database_name' with your actual database name
    } catch (err) {
      console.error('Error connecting to MongoDB Atlas:', err);
      throw err; // Rethrow the error to handle it where connectToDB is called
    }
  }

connectToDB();


// create user account
function create(name, email, password){

    console.log("inside create DAL service");

    return new Promise((resolve, reject) => {    
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0};
        // collection.insertOne(doc, {w:1}, function(err, result) {
        //     err ? reject(err) : resolve(doc);
        // });

        collection.insertOne(doc)
        .then((doc) => resolve(doc))
        .catch((err) => reject(err)); 

    })
}

// find user account
function find(email){
    return new Promise((resolve, reject) => {    
        // const users = db
        //     .collection('users')
        //     .find({email: email})
        //     .toArray(function(err, docs) {
        //         err ? reject(err) : resolve(docs);
        //     });
        const users = db
            .collection('users')
            .find({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err)); 
    })
}

// find user account
function findOne(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .findOne({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));    
    })
}

// update - deposit/withdraw amount
function update(email, amount){
    return new Promise((resolve, reject) => { 
        const customers = db
            .collection('users')
            .findOneAndUpdate(
                { email: email },
                { $inc: { balance: amount }},
                { returnDocument: "after" },
                // { upsert: true },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            )
            .then((doc) => resolve(doc))
            .catch((err) => reject(err)); 
    });    
}

// all users
function all(){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}


module.exports = {create, findOne, find, update, all}; 
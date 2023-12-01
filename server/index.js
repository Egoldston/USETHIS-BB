var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');
const e = require('express');


// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors({credentials: true, origin: true}));


// Authentication Middleware
const authMiddleware = require("./auth-middleware");
// app.use("/", authMiddleware);
app.use("/account/find", authMiddleware);
app.use("/account/findOne", authMiddleware);
app.use("/account/update", authMiddleware);
app.use("/account/all", authMiddleware);

// Firebase APP
var firebaseApp = require("firebase/app");
var firebaseAuth = require("firebase/auth");
const firebaseConfig = {
  apiKey: "AIzaSyD92hJmoz9hGZxC7DsQmXADMOHH8Kt0IiQ",
  authDomain: "fullstackbb.firebaseapp.com",
  projectId: "fullstackbb",
  storageBucket: "fullstackbb.appspot.com",
  messagingSenderId: "119221644456",
  appId: "1:119221644456:web:1342312e1681ddd6d0e69d",
};
const appFB = firebaseApp.initializeApp(firebaseConfig);

// Firebase Admin
var firebaseAdmin = require('firebase-admin');
const credentials = require("./serviceAccountCredentials.json");
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(credentials),
});




// create user account
app.get('/account/create/:name/:email/:password', function (req, res) {

    console.log('inside account creation endpoint');

    console.log("about to call firebase code...");
    // also create new user in firebase
    const auth = firebaseAuth.getAuth();
    firebaseAuth.createUserWithEmailAndPassword(auth, req.params.email, req.params.password)
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        // console.log(user);
        // res.send(user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // res.send(`${errorCode}-${errorMessage}`);
    });


    // check if account exists
    console.log('looking for ', req.params.email);
    dal.findOne(req.params.email)
        .then((user) => {
            // if user exists, return error message
            if(user){
                console.log('User already in exists');
                res.send('User already in exists');    
            }
            else{
                console.log(`${req.params.email} not found. Calling DAL service to insert ${req.params.email} into MongoDb`,);
                // else create user in mongo db
                dal.create(req.params.name, req.params.email, req.params.password).
                    then((user) => {
                        console.log(user);
                        res.send(user);
                    }); 
                console.log(`${req.params.email} sucessfully saved to MongoDb`,);
            }
        });
});


// login user 
app.get('/account/login/:email/:password', function (req, res) {

    console.log(`trying to log in ${req.params.email}`);

    const auth = firebaseAuth.getAuth();
    firebaseAuth.signInWithEmailAndPassword(auth, req.params.email, req.params.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log('signed in user', user);
            res.send(user.accessToken);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            res.status(401).send(`${errorCode}-${errorMessage}`);
        });
});


// find user account
app.get('/account/find/:email', function (req, res) {

    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user)
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
});


// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {
    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
});


// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', function (req, res) {

    console.log(`about to update balance ${req.params.amount} for ${req.params.email}`);

    var amount = Number(req.params.amount);
    dal.update(req.params.email, amount)
        .then((response) => {
            console.log(response);
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
});


// balance - deposit/withdraw amount
app.get('/account/balance/:email/', function (req, res) {

    console.log(`try to find ${req.params.email} balance`);

    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
});



// all accounts
app.get('/account/all', function (req, res) {

    dal.all()
        .then((docs) => {
            console.log(docs);
            res.send(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
});




var port = 3000;
var server = app.listen(port, function() {
    console.log('Ready on port %d', server.address().port);
});
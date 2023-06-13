// req. library
const mongoose = require('mongoose');

// coonection to database
//mongoose.connect('mongodb://localhost:27017/');
mongoose.connect('mongodb://127.0.0.1:27017');

//const uri = "mongodb://0.0.0.0:27017/";
//const client = new MongoClient(uri);

//acquire the connection (to check if it is successful)
const db = mongoose.connection;

//error
db.on('error', console.error.bind(console,'error connecting to db'));

//up and running then print the message
db.once('open',function(){
    console.log('Sucessfully connected to Database');
});



const express = require('express');
const app = express();
// const cryptoRandomString = require('crypto-random-string');
const mongoose =require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
//import router

const accountsRoute=require('./routes/account');
const kafkasRoute=require('./routes/kafka');


app.use('/',accountsRoute);
app.use('/',kafkasRoute);

const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: 30, // Retry up to 30 times
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true
};


//connect to db
mongoose.connect('mongodb+srv://mdb:1234@cluster0-5cvfz.mongodb.net/test?retryWrites=true&w=majority',options,()=>
	console.log("connected to db")
	);

app.listen(3000)
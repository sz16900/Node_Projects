const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// To connect with our database
mongoose.connect(config.database);

// Let us know we are connected to DB
mongoose.connection.on('connected', function(){
  console.log('Connected to database ' + config.database);
});

// Let us know when we have an error related to the database
mongoose.connection.on('error', function(err){
  console.log('Database error' + err);
});
const app = express();
const users = require('./routes/users');

const port = 3000;

// cors middleware: to allow request to our API from a different domain name
// just one line to handle cors
app.use(cors());

//Set static folder (Angular)
// join with current path name
app.use(express.static(path.join(__dirname, 'public')));

// body-parser middleware: parses incoming req body to grab the data
app.use(bodyParser.json());

app.use('/users', users);

// Index route
app.get('/', function(req, res){
  res.send("Invalid Endpoint");
});

// Start the server
app.listen(port, function(){
  console.log("Server started on port " + port);
});
const express = require('express')
const mongoose = require('mongoose')
const cors  = require('cors');
const bodyParser= require('body-parser');
const passport = require('passport');
const session = require('express-session');
const router = require('./routes');
const {jwtStrategy} = require('./config/passport')

const app = express()
const port = 3002

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);


mongoose.connect('mongodb+srv://admin:admin@cluster0.tpgxycs.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true, 
  useUnifiedTopology: true
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "Database connection error: "));
db.once("open", function () {
  console.log("API database connected successfully");
});


app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

app.use(cors()) 

app.listen(port, console.log('Server is on port: ' + port));

app.use('/api', router);
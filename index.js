const express = require('express');
const app = express();
const user = require('./routes/user.js');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router  = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('./routes/auth');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User');


// Map passport to db user (mogoose)
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json()); // Parser application/json
app.use(bodyParser.urlencoded({ extended: true })); // Parser application/x-www-form-urlencoded
// Routes loading
app.use('/auth', auth);
app.use('/user', passport.authenticate('jwt', {session: false}), user);

mongoose.connect('mongodb://localhost:27017/node-api-pokemon');
app.locals.db = mongoose.connection;


app.locals.db.once('open', () => {
  app.listen(8000);
});

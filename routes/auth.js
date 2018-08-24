const express = require('express');
const router  = express.Router();
const jwt      = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');


/* POST login. */
router.post('/login', function (req, res, next) {

    passport.authenticate('local', {session: false}, (err, user, info) => {
        console.log(err);
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user   : user
            });
        }

        req.login(user, {session: false}, (err) => {
      console.log(user);
      
            if (err) {
                res.send(err);
            }

            const token = jwt.sign(user.toJSON(), 'your_jwt_secret');

            return res.json({user, token});
        });
    })
    (req, res);

});

router.post('/register', (req, res) => {
  console.log(req.body);
  User.register({ username: req.body.username }, req.body.password, (err, user) => {
    
    if (err) throw err;
    ;
    return res.json(user);
  });
});

module.exports = router;

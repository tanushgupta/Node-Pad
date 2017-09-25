var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

router.get('/signin',function(req,res,next){
    User.findOne({email: req.body.email}, function(err, result){
        if(err){
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        if(!user){
            return res.status(401).json({
                title: 'Login Failed',
                error: {message: 'Invalid login credentials.'}
            });
        }
        if(!bcrypt.compareSync(req.body.password, user.password)){
            return res.status(401).json({
                title: 'Login Failed',
                error: {message: 'Invalid login credentials.'}
            });
        }
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        res.status(201).json({
            message: 'Successfully LoggedIn',
            token: token,
            userId: user._id,
            obj: result
        });
    });
});

router.post('/',function(req,res,next){
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password,10)
    });
    user.save(function(err,result){
        if(err){
            return res.status(500).json({
                title: 'Error creating user',
                error: err
            });
        }
        res.status(201).json({
            message: 'Successfully created',
            obj: result
        });
    });
});

module.exports = router;
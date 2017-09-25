var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Note = require('../models/note');
var User = require('../models/user');

router.get('/', function (req, res, next) {
    var decode = jwt.decode(req.query.token);
    Note.find({users:decode.user._id}).exec(function(err, notes){
        if(err){
            return res.status(500).json({
                title: 'Error getting notes',
                error: err
            });
        }
        res.status(201).json({
            message: 'Successful',
            obj: notes
        });
    });
    //res.render('index');
});

router.use('/', function(req, res, next){
    jwt.verify(req.query.token, 'secret', function(err, decoded){
        if(err){
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    });
});

router.post('/', function (req, res, next) {
    var decode = jwt.decode(req.query.token);
    User.findById(decode.user._id, function(err, user){
        if(err){
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        var note = new Note({
            title: req.body.title,
            content: req.body.note,
            users: user
        });
        note.save(function(err,result){
            if(err){
                return res.status(500).json({
                    title: 'Error saving note',
                    error: err
                });
            }
            user.notes.push(result);
            user.save();
            res.status(201).json({
                message: 'Successfully Saved',
                obj: result
            });
        });
    });
});

router.delete('/:id',function(req,res,next){
    Note.findById(req.params.id, function(err, notes){
        if(err){
            return res.status(500).json({
                title: 'Error deleting note',
                error: err
            });
        }
        if(!notes){
            return res.status(500).json({
                title: 'Note not found',
                error: {message: "Message not found"}
            });
        }
        notes.remove(function(err, result){
            if(err){
                return res.status(500).json({
                    title: 'Error updating note',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Successfully Deleted',
                obj: result
            });
        });
    });
});

router.patch('/:id', function(req,res,next){
    Note.findById(req.params.id, function(err, notes){
        if(err){
            return res.status(500).json({
                title: 'Error updating note',
                error: err
            });
        }
        if(!notes){
            return res.status(500).json({
                title: 'Note not found',
                error: {message: "Message not found"}
            });
        }
        notes.content = req.body.content;
        notes.save(function(err, result){
            if(err){
                return res.status(500).json({
                    title: 'Error updating note',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Successfully Updated',
                obj: result
            });
        });
    });
});

module.exports = router;
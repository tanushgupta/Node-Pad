var mongoose = require('mongoose');
var User = require('../models/user');

var schema = mongoose.Schema;

var noteSchema = new schema({
    title: { type: String},
    content: { type: String, required: true },
    users: { type: schema.Types.ObjectId , ref:'User'}
});

noteSchema.post('remove', function(message){
    User.findById(message.users, function(err, user){
        user.notes.pull(message);
        user.save();
    });
});

module.exports = mongoose.model('Note',noteSchema);
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var schema = mongoose.Schema;

var uSchema = new schema({
    name:{ type: String, required: true },
    email:{ type: String, required: true, unique:true},
    username:{ type: String, required: true , unique:true},
    password:{ type: String, required: true },
    notes:[{type: schema.Types.ObjectId, ref:'Note'}]
});

uSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User',uSchema);
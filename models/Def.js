const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

const DefSchema = new Schema ({
    DefTerm: {
        type:String,
        required: true,
        maxlength: 20,
        minlength: 2
    },
    DefText: {
        type: String,
        maxlength: 255
    },
    Cat:[
        {type:Schema.Types.ObjectId, ref: 'Cat'},
    ],
    User:[
        {type:Schema.Types.ObjectId, ref: 'User'}
    ]
});

DefSchema.plugin(timestamps);

module.exports = Def = mongoose.model("Def", DefSchema); 
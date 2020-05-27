const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

const DefSchema = new Schema ({
    defName: {
        type:String,
        required: true,
        maxlength: 50,
        minlength: 2
    },
    defText: {
        type: String,
        maxlength: 1023
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
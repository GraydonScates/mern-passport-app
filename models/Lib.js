const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LibSchema = new Schema ({
    LibName: {
        type:String,
        required: true,
        maxlength: 20,
        minlength: 2
    },
    LibType:{
        type: String,
        enum: ['text', 'video']
    },
    LibURL:{
        type: String
    },
    Cat:[
        {type:Schema.Types.ObjectId, ref: 'Cat'},
    ],
    User:[
        {type:Schema.Types.ObjectId, ref: 'User'}
    ]


});

module.exports = Lib = mongoose.model("Lib", LibSchema); 
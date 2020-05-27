const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp')
const Schema = mongoose.Schema;

const LibSchema = new Schema ({
    libName: {
        type:String,
        required: true,
        uppercase:true,
        maxlength: 20,
        minlength: 2
    },
    libType:{
        type: String,
        enum: ['TEXT', 'VIDEO'],
        default: 'TEXT'
    },
    libURL:{
        type: String,
        validate: {
            validator: v => validator.isURL(v, { protocols: ['http','https','ftp'], require_tld: true, require_protocol: true }),
            message: 'Must be a Valid URL' 
        }

    },
    Cat:[
        {type:Schema.Types.ObjectId, ref: 'Cat'},
    ],
    User:[
        {type:Schema.Types.ObjectId, ref: 'User'}
    ]
});

LibSchema.plugin(timestamps);

module.exports = Lib = mongoose.model("Lib", LibSchema); 
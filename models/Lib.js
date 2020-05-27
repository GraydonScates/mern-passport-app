const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp')
const Schema = mongoose.Schema;

const LibSchema = new Schema ({
    libName: {
        type:String,
        required: true,
        uppercase:true,
        maxlength: 1023,
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
            validator: function(v) {
                return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(v)
          },
          message: props => `${props.value} invalid URL`
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
const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

const SkillsSchema = new Schema ({
    skillsName: {
        type:String,
        required: true,
        maxlength: 255,
        minlength: 2
    },
    Master:{
        type: Boolean,
        required: true,
        default: false
    },
    Cat:[
        {type:Schema.Types.ObjectId, ref: 'Cat'},
    ],
    User:[
        {type:Schema.Types.ObjectId, ref: 'User'}
    ]
});

SkillsSchema.plugin(timestamps);

module.exports = Skills = mongoose.model("Skills", SkillsSchema); 
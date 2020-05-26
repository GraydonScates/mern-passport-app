const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

const CatSchema = new Schema ({
    catName: {
        type:String,
        required: true,
        maxlength: 255,
        minlength: 2,
        trim: true,
        uppercase: true,
        unique: true
    },
});
CatSchema.plugin(timestamps);

module.exports = Cat = mongoose.model("Cat", CatSchema); 
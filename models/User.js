const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName:{
        type: String,
        uppercase: true,
        required: true
    },
    lastName: {
        type: String,
        uppercase: true,
        required: true
    },
    address1: {
        type: String,
        uppercase: true,
        required: true
    },
    address2: {
        type: String,
        uppercase: true,
    },
    city:{
        type: String,
        uppercase: true,
        required: true
    },
    st: {
        type: String,
        enum: [
            "AK", "AL", "AR", "AS", "AZ", "CA",
            "CO", "CT", "DC", "DE", "FL", "GA", "GU",
            "HI", "IA", "ID", "IL", "IN", "KS", "KY", 
            "LA", "MA", "MD", "ME", "MI","MN","MO","MP",
            "MS", "MT", "NC", "ND", "NE","NH", "NJ","NM",
            "NV", "NY", "OH", "OK", "OR","PA", "PR", "RI",
            "SC", "SD", "TN", "TX", "UM", "UT", "VA", "VI",
            "VT", "WA", "WI", "WV", "WY" 
        ]
    },
    zip: {
        type: String,
        minlength: 5,
        maxlength: 9,
        required: true,
        validate: {
            validator: function(v){
                return /\d/.test(v);
            },
            message: props=>`${props.value} invalid zip`
        }
    },
    phone: {
        type: String,
        validate: {
          validator: function(v) {
              return /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/i.test(v)
        },
        message: props => `${props.value} invalid phone`
      }
    },
    phoneType: {
        type: String,
        enum: ["Mobile", "Landline", "None"]
    }
});
UserSchema.plugin(timestamps);

module.exports = User = mongoose.model("User", UserSchema); 
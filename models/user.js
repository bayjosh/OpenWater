const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        trim: true,
        required: true
    },
    lastname: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true
        // required: true
    },
    password: {
        type: String,
        required: true
        // required: true
    }

});

const User = mongoose.model("User", voyageSchema);

module.exports = User;

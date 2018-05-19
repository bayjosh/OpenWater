const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema to create users collection
const userSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        // required: true
        // required: true
    },
    password: {
        type: String,
        // required: true
        // required: true
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

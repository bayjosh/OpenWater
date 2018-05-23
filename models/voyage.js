const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema to create voyages collection
const voyageSchema = new Schema({
    name: {
        type: String,
        unique: true,
        trim: true
        // required: true
    },
    date: {
        type: String
        // required: true
    },
    description: {
        type: String,
        trim: true
        // required: true
    },
    fuel: {
        type: String,
    },

    hoursStart: {
        type: Number,
    },

    hoursEnd: {
        type: Number,
    },

    voyageHours: {
        type: Number,
    },

    pictures: {
        type: Array,
    },

    dateSaved: {
        type: Date,
        default: Date.now
    }
});

const Voyage = mongoose.model("Voyage", voyageSchema);

module.exports = Voyage;

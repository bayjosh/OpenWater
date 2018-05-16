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

    mileageStart: {
        type: Number,
    },

    mileageEnd: {
        type: Number,
    },

    voyageDistance: {
        type: Number,
    },

    dateSaved: {
        type: Date,
        default: Date.now
    }
});

const Voyage = mongoose.model("Voyage", voyageSchema);

module.exports = Voyage;

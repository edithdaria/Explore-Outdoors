//NoSql db
const mongoose = require("mongoose");

const ParkSchema = new mongoose.Schema({

    stateCode: {
        type: String,
        trim: true,
    },

    stateName: {
        type: String,
        trim: true,

    },

    parkCode: {
        type: String,
        trim: true,
       unique: true
    },

    activities: [
        {
            type: String,
            trim: true,
        }
    ],

    topics: [
        {
            type: String,
            trim: true,
        }
    ]

});

const parkdb = mongoose.model("park", ParkSchema);

module.exports = parkdb;




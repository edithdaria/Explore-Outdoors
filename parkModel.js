//NoSql db
const mongoose = require("mongoose");

const ParkSchema = new mongoose.Schema({

    stateCode: {
        type: String,
        trim: true,
        //unique: true
    },

    stateName: {
        type: String,
        trim: true,
       // unique: true
    },

    activities: [
        {
            type: String,
            trim: true,
            // unique: true
        }
    ],

    topics: [
        {
            type: String,
            trim: true,
            // unique: true
        }
    ]

});

const parkdb = mongoose.model("park", ParkSchema);

module.exports = parkdb;




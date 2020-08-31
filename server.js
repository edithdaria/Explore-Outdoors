// setup server
const express = require("express");

//mongodb setup
const mongojs = require("mongojs");

//keep log of searches
const logger = require("morgan");

//NoSql database
const mongoose = require("mongoose");

//port setup
const PORT = process.env.PORT || 3000;

//schema
const parkdb = require("./parkModel.js");
const app = express();

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static("./"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/parkdb", { useNewUrlParser: true });

require('./routes/api-routes')(app);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});


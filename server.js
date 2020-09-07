
// setup server
const express = require("express");

//mongodb setup
const mongojs = require("mongojs");

//keep log of searches
const logger = require("morgan");

const dotenv = require("dotenv").config();

//NoSql database
const mongoose = require("mongoose");

const db = mongojs(process.env.MONGODB_URI, ["parks"]);

//port setup
const PORT = process.env.PORT || 3000;

//schema
//const parkdb = require("./parkModel.js");

const app = express();

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json({limit: "16mb"}));

app.use(express.static("./"));

//require('./routes/api-routes')(app);

app.get("/state", (req, res) => {
  db.parks.find({"data.states":Object.keys(req.query)[0]}, (error, found) => {
    if (error) {
      console.log(error);
    } else {
      res.json(found);
    }
  });
});

app.get("/activities", (req, res) => {
  console.log(req.query.state, req.query.activity);
  db.parks.aggregate([{$unwind:"$data"}, {$unwind:"$data.activities"}, 
  {$match:{"data.activities.name":req.query.activity, "data.states": req.query.state}}], (error, found) => {
    if (error) {
      console.log(error);
    } else {
      res.json(found);
    }
  });
});

app.get("/topics", (req, res) => {
  console.log(req.query.state, req.query.topics);
  db.parks.aggregate([{$unwind:"$data"}, {$unwind:"$data.topics"}, 
  {$match:{"data.topics.name":req.query.topics, "data.states": req.query.state}}], (error, found) => {
    if (error) {
      console.log(error);
    } else {
      res.json(found);
    }
  });
});


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});


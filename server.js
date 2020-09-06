
// setup server
const express = require("express");

//mongodb setup
const mongojs = require("mongojs");

//keep log of searches
const logger = require("morgan");

//NoSql database
const mongoose = require("mongoose");

//db
//const db = mongojs("parkdb", ["parks"]);
const db = mongojs("process.env.MONGODB_URI", ["parks"]);

//port setup
const PORT = process.env.PORT || 3000;

//schema
//const parkdb = require("./parkModel.js");

const app = express();

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json({limit: "16mb"}));

app.use(express.static("./"));


//mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://user:Password1@clusterexplore.uqtfh.mongodb.net/parkdb?retryWrites=true&w=majority", { useNewUrlParser: true });
//mongoose.connection.on('connected', () => console.log('Connected'));
//mongoose.connection.on('error', () => console.log('Connection failed with - ',err));

//require('./routes/api-routes')(app);

app.get("/state", (req, res) => {
  console.dir(Object.keys(req.query));
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
  db.parks.find({}, (error, found) => {
    if (error) {
      console.log(error);
    } else {
      res.json(found);
    }
  });
});

app.get("/topics", (req, res) => {
  console.log(req.body);
  db.parks.find({ read: true }, (error, found) => {
    if (error) {
      console.log(error);
    } else {
      res.json(found);
    }
  });
});

app.get("/test", (req, res) => {
    res.send("test string")
})



app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});


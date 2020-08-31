// setup server
const express = require("express");

//mongodb setup
const mongojs = require("mongojs");

//keep log of searches
const logger = require("morgan");

//NoSql database
const mongoose = require("mongoose");

const databaseUrl = "parkdb";
const collections = ["parks"];
const db = mongojs(databaseUrl, collections);

//port setup
const PORT = process.env.PORT || 3000;

//schema
//const Parks = require("./parkModel.js");
const app = express();

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static("./"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/parkdb", { useNewUrlParser: true });

app.post("/api/parks", ({ body }, res) => {
    const park = body;
  
    park.read = false;
  
    db.parks.save(park, (error, saved) => {
      if (error) {
        console.log(error);
      } else {
        res.send(saved);
      }
    });
  });



//require('./routes/api-routes')(app);
// require('./routes/html-routes')(app);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});


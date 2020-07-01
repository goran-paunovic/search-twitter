const express = require("express");
const cors = require("cors");
const Twit = require("twit");

const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

const T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  app_only_auth: true,
});

app.get("/search", function (req, res) {
  if (!req.query.q) {
    res.status(400);
    res.json({ message: "Query parameters are missing." });
  } else {
    const params = {
      q: req.query.q ? `#${req.query.q}` : "",
      max_id: req.query.max_id,
      count: 20,
    };

    T.get("search/tweets", params, function (err, data, response) {
      if (err) {
        res.status(err.statusCode);
      } else {
        res.status(200);
      }
      res.json(data);
    });
  }
});

app.get("/user", function (req, res) {
  if (!req.query.id || !req.query.scrname) {
    res.status(400);
    res.json({ message: "Query parameters are missing." });
  } else {
    const params = {
      user_id: req.query.id ? `${req.query.id}` : "",
      screen_name: req.query.scrname ? `${req.query.scrname}` : "",
    };

    T.get("users/show", params, function (err, data, response) {
      if (err) {
        res.status(err.statusCode);
      } else {
        res.status(200);
      }
      res.json(data);
    });
  }
});

const port = process.env.PORT || 4000;

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Twitter search API listening at http://localhost:%s", port);
});

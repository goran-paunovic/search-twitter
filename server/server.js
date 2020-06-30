const express = require("express");
const cors = require("cors");
const Twit = require("twit");
var qs = require("qs");

const dotenv = require("dotenv");
dotenv.config();

const T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  app_only_auth: true,
});

const app = express();
const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

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

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log(
    "Twitter search API listening at http://localhost:%s/search",
    port
  );
});

const Twitter = require("twitter");
const config = require("../config");
const express = require("express");
const axios = require("axios");
const logger = require("morgan");
const router = express.Router();
const T = new Twitter(config);

router.use(logger("tiny"));
router.get("/search", (req, res) => {
  const options = createTwitterOptions(
    req.query.query,
    req.query.result_type,
    req.query.count,
    req.query.geocode
  );

  T.get("search/tweets", options, function (err, data, response) {
    if (!err) {
      var tweetData = data.statuses.map((status) => {
        return {
          id: status.id,
          text: status.text,
          userId: status.user.id,
          userName: status.user.name,
          screenName: status.user.screen_name,
          location: status.user.location,
          profileImage: status.user.profile_image_url_https,
          geo: status.geo,
          coordinates: status.coordinates,
        };
      });

      res.json(tweetData);
    } else {
      res.json(err);
    }
  });
});

router.get("/woeid", (req, res) => {
  const options = createWoeidTwitterOptions(req.query.lat, req.query.long);
  T.get("trends/closest", options, function (err, data, response) {
    if (!err) {
      res.json(data[0].woeid);
    } else {
      res.json(err);
    }
  });
});

router.get("/trends", (req, res) => {
  const options = createTrendTwitterOptions(req.query.id);
  T.get("trends/place", options, function (err, data, response) {
    if (!err) {
      var trends = data[0].trends.map((trend) => {
        if (trend.tweet_volume != null) {
          return {
            name: trend.name,
            query: trend.query,
            tweet_volume: trend.tweet_volume,
          };
        }
      });
      trends = trends.filter((trend) => trend != null);
      res.json(trends);
    } else {
      res.json(err);
    }
  });
});
// Set up search parameters
function createTwitterOptions(query, type, tweet_count, geocode) {
  const params = {
    q: query,
    result_type: type,
    count: tweet_count,
    lang: "en",
    if(geocode) {
      geocode: geocode;
    },
  };
  return params;
}
function createWoeidTwitterOptions(lat, long) {
  const params = {
    lat: lat,
    long: long,
  };
  return params;
}
function createTrendTwitterOptions(id) {
  const params = {
    id: id,
  };
  return params;
}

module.exports = router;

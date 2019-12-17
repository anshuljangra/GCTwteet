const Twitter = require('twitter');
const config = require('../config');
const express = require('express');
const axios = require('axios');
const logger = require('morgan');
const router = express.Router();
const T = new Twitter(config);

router.use(logger('tiny'));
router.get('/search', (req, res) => {
    const options = createTwitterOptions(req.query.query, req.query.result_type, req.query.count, req.query.geocode);
    
    T.get('search/tweets', options, function(err, data, response) {
        if(!err){
        var tweetData = data.statuses.map(status => {
            return {
                id: status.id,
                text: status.text,
                userId: status.user.id,
                userName: status.user.name,
                screenName: status.user.screen_name,
                location: status.user.location,
                profileImage: status.user.profile_image_url_https,
                geo: status.geo,
                coordinates: status.coordinates
            }

        });

        res.json(tweetData);
        } else {
        console.log(err);
        }
    }) 
}); 
 

// Set up search parameters
function createTwitterOptions(query, type, tweet_count, geocode) {
    const params = {
        q: query,
        result_type: type,
        count: tweet_count,
        lang: 'en',
        if(geocode){
            geocode: geocode
        }
        
    }
    return params;
}
module.exports = router;






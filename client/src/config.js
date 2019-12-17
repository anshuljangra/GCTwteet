const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    google_maps_key: `${process.env.GOOGLE_MAPS_API}`,
}
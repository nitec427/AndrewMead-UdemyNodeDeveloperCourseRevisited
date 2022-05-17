// Rather than doing without callback, use callback with proper logic

const request = require("request");

const geocode = (address, callback) => {
  // Build your url by adress
  const geo_url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?types=address&limit=1&access_token=pk.eyJ1IjoiY2V0aW5pMTgiLCJhIjoiY2t6OHhkY3ptMGFjMDJubXFhaHd4bWl6eCJ9.GJQOHc2dkNKFoU5lLlMLOw";

  request({ url: geo_url, method: "GET", json: true }, (err, res) => {
    if (err) callback("Unable to connect geocode", undefined);
    else if (res.body.features.length === 0)
      callback("No proper use of GeoCode API", undefined);
    else {
      // Call with your data
      const data = res.body;
      const latitude = data.features[0].center[1];
      const longitude = data.features[0].center[0];
      const location = data.features[0].place_name;
      callback(undefined, { latitude, longitude, location });

      console.log(latitude, longitude, location);
    }
  });
};
module.exports = { geocode };

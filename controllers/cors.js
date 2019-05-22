const axios = require('axios');

async function handleRequest (req, res){
  const TOKEN = process.env.API_TOKEN
  let response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${req.body.location}.json?access_token=${TOKEN}`)
  res.json({"data" : response.data});
}

module.exports = {
  handleRequest,
};





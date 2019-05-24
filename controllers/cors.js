const axios = require('axios');
const escape = require('escape-html');
const encodeUrl = require('encodeurl')

async function handleRequest (req, res){
  const TOKEN = process.env.API_TOKEN
  if(req.body.location.length > 0){
    const location = encodeUrl(escape(req.body.location));
    console.log(location);
    let response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?langugae=en&access_token=${TOKEN}`)
    res.json({"data" : response.data});
  }
}

module.exports = {
  handleRequest,
};





const axios = require('axios');
const escape = require('escape-html');
const encodeUrl = require('encodeurl')

async function handleRequest (req, res){
  const TOKEN = process.env.API_TOKEN
  if(req.body.location && req.body.location.length > 0){
    const location = encodeUrl(escape(req.body.location));
    console.log(location);
    let response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?langugae=en&access_token=${TOKEN}`)
    res.json({"data" : response.data});
  }
  console.log(req.body);
  if(req.body.coordinates){
    const {lon, lat} = req.body.coordinates;
    let {data} = await axios.get(`https://my-little-cors-proxy.herokuapp.com/https://api.mapbox.com/v4/mapbox.streets/${lon},${lat},12/600x400@2x.png?access_token=${TOKEN}`);
    res.json({data});

  }
}

module.exports = {
  handleRequest,
};





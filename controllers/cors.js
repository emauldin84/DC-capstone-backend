const axios = require('axios');
const escape = require('escape-html');
const encodeUrl = require('encodeurl')

async function handleRequest (req, res){
  const TOKEN = process.env.API_TOKEN
  if(req.body.location.includes("-")){
    // intercept the location name and translate/salt the location name to sanitize the name to exclude unsupported characters
    console.log("Dumb dumb dubrovnik");
  }
  if(req.body.location.length > 0){
    const location = encodeUrl(escape(req.body.location));
    console.log(location);
    let response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?langugae=en&access_token=${TOKEN}`)
    .then(r => {
      console.log("did it happen here?");
      return r
    })
    res.json({"data" : response.data});
  }
  // res.json({"data" : ['']});
}

module.exports = {
  handleRequest,
};





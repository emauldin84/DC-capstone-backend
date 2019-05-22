const Photos = require('../models/photos');

async function addPhotos (req, res) {
  //photo url will be passed as parameter in url from react
  console.log("req.files is" ,req.files);
  //using express-fileupload - it will b4e in the req.files object
  if (Object.keys(req.files).length == 0) {
    return res.json({message:'No files were uploaded.'});
  }
  let sampleFile = (req.files.file ? req.files.file : "bad_file_name.xxx");
  console.log(sampleFile);
  //get a unique number based on date and trip id:
  let {tripID} = req.body;
  const randomNumber = Math.floor(Math.random() * Math.floor(1000)) // gets random number, 0 - 1000
  tripID ? tripID = tripID : tripID = randomNumber;
  let fileName = tripID.toString() + Date.now().toString() + sampleFile.name;
  sampleFile.mv(`./public/photos/${fileName}`, async function(err) {
    if (err) {
        return res.json({message:'error - No files were uploaded.'});
    }
    // save the data to the database
    await Photos.addPhotoURL(tripID,`photos/${fileName}`) ;
    res.json({message:"file uploaded succesfully"});
  });
}

async function getUserPhotos(req, res){

}

  module.exports = {
    addPhotos,
    getUserPhotos,
};
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
  console.log("req.body: ", req.body);
  console.log("req.files.tripId: ", req.files.tripId);
  let {tripId} = req.body;
  console.log("Trip ID: ",tripId);
  const randomNumber = Math.floor(Math.random() * Math.floor(1000)) // gets random number, 0 - 1000
  tripId ? tripId = tripId : tripId = randomNumber;
  // let fileName = tripId.toString() + Date.now().toString() + sampleFile.name;
  let fileName = `${tripId}_${sampleFile.name.split('.')[0]}_${Date.now()}.${sampleFile.name.split('.')[1]}`;
  sampleFile.mv(`./public/photos/${fileName}`, async function(err) {
    if (err) {
        return res.json({message:'error - No files were uploaded.'});
    }
    // save the data to the database
    const {id} = await Photos.addPhotoURL(tripId,`photos/${fileName}`) ;
    res.json({message:"file uploaded succesfully", photoID: id});
  });
}

async function getUserPhotos(req, res){

}

  module.exports = {
    addPhotos,
    getUserPhotos,
};
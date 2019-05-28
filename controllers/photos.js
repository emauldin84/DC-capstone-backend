const Photos = require('../models/photos');
const Trips = require('../models/trips');
const User = require('../models/users');

async function addPhotos (req, res) {
  const files = req.files;

  // Some error handling
  if (Object.keys(req.files).length == 0) {
    return res.json({message:'No files were uploaded.'});
  }
  const {tripId} = req.body;
  if(!tripId){
    return res.json({message:'No files were uploaded, bad Trip ID.'});
  }

  // Iterating over all the photos to put them into OS
  const filesByName = Object.keys(files);
  const fileNames = filesByName.map(ref => {
    const file = files[ref];
    let fileName = `${tripId}_${file.name.split('.')[0]}_${Date.now()}.${file.name.split('.')[1]}`;
    file.mv(`./public/photos/${fileName}`, async function(err) {
      if (err) {
          return res.json({message:'error - No files were uploaded.'});
      }
      // Take the photo name and put it into DB
      const {id} = await Photos.addPhotoURL(tripId, fileName);
    });    
    return fileName;
  });

  // Update the trips table in DB with the latest photo names
  const response = await Trips.updateTripPhotoURL(tripId, fileNames);
  const {trip_photos} = response[0];

  res.json({message:"file uploaded succesfully", trip_photos});
}

async function newProfilePhoto (req, res) {
  //photo url will be passed as parameter in url from react
  console.log("req.files is" ,req.files);
  //using express-fileupload - it will b4e in the req.files object
  if (Object.keys(req.files).length == 0) {
    return res.json({message:'No files were uploaded.'});
  }
  let sampleFile = (req.files.file ? req.files.file : "bad_file_name.xxx");
  console.log(sampleFile);
  //get a unique number based on date and trip id:
  const randomNumber = Math.floor(Math.random() * Math.floor(1000)) // gets random number, 0 - 1000
  // let fileName = randomNumber.toString() + Date.now().toString() + sampleFile.name;
  let fileName = `${randomNumber}_${sampleFile.name.split('.')[0]}_${Date.now()}.${sampleFile.name.split('.')[1]}`;
  sampleFile.mv(`./public/photos/${fileName}`, async function(err) {
    if (err) {
        return res.json({message:'error - No files were uploaded.'});
    }
    // save the data to the database

    // Need a User method to push filename into db where photo URL should go  
    const newPic = await User.updateUserPhoto(req.session.user.id, fileName);
    res.json({newPic});
  });
}

async function undoProfilePhoto(req, res){
  const fileName = req.body.url;
  console.log(fileName);
  const newPic = await User.updateUserPhoto(req.session.user.id, fileName);
  res.json({newPic});
}

async function getUserPhotos(req, res){

}

  module.exports = {
    addPhotos,
    getUserPhotos,
    newProfilePhoto,
    undoProfilePhoto,
};
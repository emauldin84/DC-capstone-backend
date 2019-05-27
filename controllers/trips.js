const Trip = require('../models/trips');
const User = require('../models/users');
const Photo = require('../models/photos');

async function getAllTrips(req, res) {
    const tripsArray = await Trip.getAllTrips();
    res.send(tripsArray);
}

async function getTripById(req, res) {
    const clickedTrip = await Trip.getTripById(req.params.id);
    res.json({clickedTrip});
}

async function getTripsByUserId(req, res) {
    const tripsArray = await Trip.getTripsByUserId(req.session.user.id);
    res.json(tripsArray);
}

async function addNewTrip(req, res) {
    let newTrip = await Trip.addNewTrip(req.body.location, req.body.date, req.body.lat, req.body.lon, req.body.details, req.session.user.id)
    res.json({tripID : newTrip});
}

async function editTrip(req, res) {
    let editedTrip = await Trip.editTrip(req.body.trip_location, req.body.trip_date, req.body.lat, req.body.lon, req.body.trip_details, req.body.trip_photos, req.params.id);
    res.json({destination : editedTrip});
}

async function deleteTrip(req, res) {
    let deletedTrip = await Trip.deleteTrip(req.params.id);
    console.log("Deleted trip: ");
    console.log(deletedTrip);
    res.json({message:"successfully deleted trip"});
}

async function getTripPhotos(req, res){
    let {id} = req.params;
    let imgs = await Photo.getPhotoURLs(id);
    res.json({imgs});
}

module.exports = {
    getAllTrips,
    getTripById,
    addNewTrip,
    editTrip,
    deleteTrip,
    getTripsByUserId,
    getTripPhotos,
};
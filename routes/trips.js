const express = require('express');

const tripsRouter = express.Router();

const {
    getAllTrips,
    getTripById,
    addNewTrip,
    editTrip,
    deleteTrip,
    getTripsByUserId,
    getTripPhotos,
} = require('../controllers/trips');

tripsRouter.get('/alltrips', getAllTrips);
tripsRouter.get('/:id', getTripById);
tripsRouter.get('/', getTripsByUserId);
tripsRouter.get('/photos/:id', getTripPhotos);
tripsRouter.post('/add', addNewTrip);
tripsRouter.post('/edit/:id', editTrip);
tripsRouter.delete('/delete/:id', deleteTrip);

module.exports = tripsRouter;
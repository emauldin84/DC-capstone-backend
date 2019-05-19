const express = require('express');

const tripsRouter = express.Router();

const {
    getAllTrips,
    getTripById,
    addNewTrip,
    editTrip,
    deleteTrip,
} = require('../controllers/trips');

tripsRouter.get('/alltrips', getAllTrips);
tripsRouter.get('/trip/:id', getTripById);
tripsRouter.post('/add', addNewTrip);
tripsRouter.post('/edit/:id', editTrip);
tripsRouter.post('/delete/:id', deleteTrip);

module.exports = tripsRouter;
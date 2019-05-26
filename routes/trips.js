const express = require('express');

const tripsRouter = express.Router();

const {
    getAllTrips,
    getTripById,
    addNewTrip,
    editTrip,
    deleteTrip,
    getTripsByUserId
} = require('../controllers/trips');

tripsRouter.get('/alltrips', getAllTrips);
tripsRouter.get('/trip/:id', getTripById);
tripsRouter.get('/', getTripsByUserId);
tripsRouter.post('/add', addNewTrip);
tripsRouter.post('/edit/:id', editTrip);
tripsRouter.delete('/delete/:id', deleteTrip);

module.exports = tripsRouter;
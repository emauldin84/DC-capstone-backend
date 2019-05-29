

const express = require('express');

const photosRouter = express.Router();

const {
  addPhotos,
  getUserPhotos,
  deletePhotoByURL,
} = require('../controllers/photos');


photosRouter.post('*', addPhotos);
photosRouter.get('*', getUserPhotos);
photosRouter.delete('/:tripId/:deleteMe', deletePhotoByURL);

module.exports = photosRouter;
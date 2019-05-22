

const express = require('express');

const photosRouter = express.Router();

const {
  addPhotos,
  getUserPhotos,
} = require('../controllers/photos');


photosRouter.post('*', addPhotos);
photosRouter.get('*', getUserPhotos);

module.exports = photosRouter;
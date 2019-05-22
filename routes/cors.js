const express = require('express');

const corsRouter = express.Router();

const {
    handleRequest,
} = require('../controllers/trips');

corsRouter.post('*', handleRequest);

module.exports = corsRouter;
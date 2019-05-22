const express = require('express');

const corsRouter = express.Router();

const {
    handleRequest,
} = require('../controllers/cors');

corsRouter.post('*', handleRequest);

module.exports = corsRouter;
const express = require('express');
const sessionRouter = express.Router();

const {
  sessionCheck,
} = require('../controllers/signin');

sessionRouter.get('*', (req, res) => {
  console.log("Checking user's session");
  sessionCheck(req, res);
});

module.exports = sessionRouter;
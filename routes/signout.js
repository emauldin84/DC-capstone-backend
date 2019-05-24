const express = require('express');
const signOutRouter = express.Router();

const {
  signOut,
} = require('../controllers/signin');

signOutRouter.get('*', (req, res) => {
  console.log("Signing out...");
  signOut(req, res);
});

module.exports = signOutRouter;
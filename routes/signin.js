const express = require('express');

const signInRouter = express.Router();

const {
    checkPassword,
} = require('../controllers/signin');

signInRouter.post('*', checkPassword);
signInRouter.get('*', (req, res) => res.render('signin'));

module.exports = signInRouter;
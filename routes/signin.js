const express = require('express');

const signInRouter = express.Router();

const {
    checkPassword,
    signUp,
} = require('../controllers/signin');


signInRouter.post('*', (req, res) => {
    // Purpose of this conditional is to obliquely check if the incoming route is for new users or returning users.
    // It makes the assumption that the `req.body` will only contain two keys, "email" and "password" if it is a returning user.
    // Otherwise, if the body contains more information than that, the intent is presumed to be registration.
    console.log(req.body);
    if(Object.keys(req.body).length > 2){
        signUp(req, res);
    }
    else{
        checkPassword(req, res);
    }
});
signInRouter.get('*', (req, res) => res.render('signin'));

module.exports = signInRouter;
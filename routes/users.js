const express = require('express')

const usersRouter = express.Router();

const {
    getAllUsers,
    addNewUser,
} = require('../controllers/users');

usersRouter.get('/allusers', getAllUsers);
usersRouter.post('/register', addNewUser);

module.exports = usersRouter;
const express = require('express');

const usersRouter = express.Router();

const {
    getAllUsers,
    addNewUser,
    getUserByEmail,
    getUserById,
    updateUserByID,
} = require('../controllers/users');

usersRouter.get('/allusers', getAllUsers);
usersRouter.get('/email/:email', getUserByEmail);
// usersRouter.get('/id/:id', getUserById);
usersRouter.get('/', getUserById);
usersRouter.post('/', updateUserByID);
usersRouter.post('/register', addNewUser);

module.exports = usersRouter;
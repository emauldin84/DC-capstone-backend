const express = require('express');

const usersRouter = express.Router();

const {
    getAllUsers,
    addNewUser,
    getUserByEmail,
    getUserById,
    updateUserByID,
    updatePassworByID
} = require('../controllers/users');
const {
    newProfilePhoto,
} = require('../controllers/photos');

usersRouter.get('/allusers', getAllUsers);
usersRouter.get('/email/:email', getUserByEmail);
// usersRouter.get('/id/:id', getUserById);
usersRouter.get('/', getUserById);
usersRouter.post('/', updateUserByID);
usersRouter.post('/profilepic', newProfilePhoto);
usersRouter.post('/password', updatePassworByID);
usersRouter.post('/register', addNewUser);

module.exports = usersRouter;
const User = require('../models/users')

async function getAllUsers(req, res) {
    const usersArray = await User.getAllUsers();

    res.send(usersArray)
}

async function addNewUser(req, res) {
    // console.log('req.body:', req.body)
    const newUser = await User.getUserByEmail(req.body.email);

    if (!newUser.email) {
        const newPassword = User.hashPassword(req.body.password);
        await User.addNewUser(req.body.first_name, req.body.last_name, req.body.email, newPassword)

        res.send(newUser)
        req.session.email = req.body.email;
        console.log('this is the req.session.email:', req.session.email);
        req.session.save()
    } else if (newUser.email) {
        // how to translate this message to react?
        console.log('that email address already exists!')
    }
}

async function getUserByEmail(req, res) {
    const userInstance = await User.getUserByEmail(req.params.email)

    res.send(userInstance)
}

async function getUserById(req, res) {
    const userInstance = await User.getUserById(req.params.id)

    res.send(userInstance)
}


module.exports = {
    getAllUsers,
    addNewUser,
    getUserByEmail,
    getUserById,
}
const User = require('../models/users')

async function getAllUsers(req, res) {
    // console.log(req);

    const usersArray = await User.getAllUsers();

    res.send(usersArray)
}

async function addNewUser(req, res) {
    console.log('req.body:', req.body)
    // const newUser = await User.getByEmail(req.body.email);

    // if (!newUser.email) {
        const newPassword = User.hashPassword(req.body.password);
        let newUser = await User.addNewUser(req.body.first_name, req.body.last_name, req.body.email, newPassword)

        res.send(newUser)
        // req.session.email = req.body.email;
    // }

}


module.exports = {
    getAllUsers,
    addNewUser
}
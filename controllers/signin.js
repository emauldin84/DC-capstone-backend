const User = require('../models/users')

async function checkPassword(req, res) {
    console.log('sign in controller!')
    const theUser = await User.getUserByEmail(req.body.email)
    // const theUser = new User (theUserData)
    console.log(theUser)
    // const hashPass = await User.hashPassword(req.body.password)
    // console.log(hashPass)
    const isPasswordTrue = await theUser.checkPassword(req.body.password, theUser.userPassword)
    console.log(isPasswordTrue)
    if (isPasswordTrue) {
        req.session.user = theUser
        req.session.save()
        res.redirect('/')
    }else{
        res.redirect('/signin')
    }
}


module.exports = {
    checkPassword,
}
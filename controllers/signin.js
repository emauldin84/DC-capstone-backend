const User = require('../models/users')

async function checkPassword(req, res) {
    // console.log('sign in controller!');
    console.log(req.body);
    const theUser = await User.getUserByEmail(req.body.email);
    // const theUser = new User (theUserData)
    console.log(theUser);
    if(!theUser){
        res.json({status : 401});
    }
    const isPasswordTrue = await theUser.checkPassword(req.body.password, theUser.userPassword);
    console.log("Password is a match? ", isPasswordTrue);
    if (isPasswordTrue) {
        req.session.user = theUser;
        req.session.save();
        res.json(theUser);
        // res.redirect('/')
    }else{
        // res.status(401);
        res.json({status : 401});
        // res.redirect('/signin')
    }
}

async function signUp(req, res) {
    let {firstName, lastName, email, password} = req.body;
    password = User.hashPassword(password);
    const emailAlreadySignedUp = await User.emailAlreadyExists(email);
    if(emailAlreadySignedUp){
        res.json({status : 401});
    }
    else{
        const {id} = await User.addNewUser(firstName, lastName, email, password);
        const newUser = await User.getUserById(id);
        req.session.user = newUser;
        req.session.save();
        res.json(newUser);
    }
}

function signOut(req, res) {
    // destroy session
    // console.log(req.session);
    req.session.destroy();
    // console.log(req.session);
    res.render('index');
}

async function sessionCheck(req, res) {
    if(!req.session){
        console.log("controllers/signin, func(sessionCheck), you could have just used 'req.session'");
    }
    if(req.session.user.id){
        const user = await User.getUserById(req.session.user.id);
        res.json({user});
    }
    else{
        res.json({user:{}});
    }
}


module.exports = {
    checkPassword,
    signUp,
    signOut,
    sessionCheck,
};
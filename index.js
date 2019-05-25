require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;
const helmet = require('helmet');
const sessionRouter = require('./routes/session')
const signInRouter = require('./routes/signin')
const signOutRouter = require('./routes/signout')
const cors = require('cors');

app.use(helmet());

const fileUpload = require('express-fileupload');

const session = require('express-session');
const FileStore = require('session-file-store')(session);

app.use(session( {
    store: new FileStore(),
    secret: process.env.SECRET
}
));
app.use(express.json()); // Required for passing JSON to `req.body`
app.use(express.urlencoded({extended: true}));
app.use(cors());
const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views','views');
app.set('view engine','html');

app.use(express.static('public'))

app.use(fileUpload(
    {createParentPath:true}
));

app.use('/signin', signInRouter)
app.use('/session', sessionRouter)

// // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// // Below is a piece of middleware no longer necessary as we have React keeping 
// // track of login credentials in the LandingPage component. This is being replaced
// // by a router that will get hit with a request from the frontend when the page is
// // loaded for the first time / refreshed. That will ultimately check if there is a
// // session already and, if so, will automatically pass back the user's info.
//
// app.use('*', (req, res, next) => {
//     console.log('made it to *')
//     if (req.session){
//         console.log('yay')
//     }
//     else{
//         console.log('nooo')
//         // res.redirect('/signin')
//     }
//     console.log(req.path);
//     next();
//     // req.session ? () => console.log('yay') : () => console.log('nooo')
//     // req.session.user ? next() : res.redirect('/signin')
// })
// // // // // // // // // // // // // // // // // // // // // // // // // // // // 

const usersRouter = require('./routes/users');
const tripsRouter = require('./routes/trips');
const corsRouter = require('./routes/cors');
const photosRouter = require('./routes/photos');
app.use('/signout', signOutRouter);
app.use('/cors', corsRouter);
app.use('/users', usersRouter);
app.use('/trips', tripsRouter);
app.use('/photos', photosRouter);

app.use('/', (req, res) => {
    console.log('sending to index')
    // res.json({'message': 'success'})})
    res.render('index')

})
app.use('*', (res => res.json({'message': '404: Page does not exist'})))


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
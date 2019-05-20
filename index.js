require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;
const helmet = require('helmet');
const signInRouter = require('./routes/signin')

app.use(helmet());

const session = require('express-session');
const FileStore = require('session-file-store')(session);

app.use(session( {
    store: new FileStore(),
    secret: process.env.SECRET
}
));

app.use(express.urlencoded({extended: true}));
const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views','views');
app.set('view engine','html');

app.use(express.static('public'))

app.use('/signin', signInRouter)

app.use('*', (req, res, next) => {
    console.log('made it to *')
    // req.session ? () => console.log('yay') : res.redirect('/signin')
    if (req.session){
        console.log('yay')
    }
    else{
        console.log('nooo')
        // res.redirect('/signin')
    }
    next();
    // req.session ? () => console.log('yay') : () => console.log('nooo')
    // req.session.user ? next() : res.redirect('/signin')
})


app.use('/', (req, res) => {
    console.log('sending to index')
    // res.json({'message': 'success'})})
    res.render('index')
    
})
app.use('*', (res => res.json({'message': '404: Page does not exist'})))





const usersRouter = require('./routes/users');
const tripsRouter = require('./routes/trips');



app.use('/users', usersRouter);
app.use('/trips', tripsRouter);




app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
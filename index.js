require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;
const helmet = require('helmet');

app.use(helmet());

app.use(express.urlencoded({extended: true}));

const session = require('express-session');
const FileStore = require('session-file-store')(session);


const usersRouter = require('./routes/users');
const tripsRouter = require('./routes/trips');

app.use(session( {
    store: new FileStore(),
    secret: process.env.SECRET
}
));

app.use('/users', usersRouter);
app.use('/trips', tripsRouter);



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
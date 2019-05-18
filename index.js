const express = require('express');
const app = express();
const port = 31337;

app.use(express.urlencoded({extended: true}));


const usersRouter = require('./routes/users');

app.use('/', usersRouter);



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
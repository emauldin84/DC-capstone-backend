const express = require('express');
const app = express();
const port = 31337;

app.use(express.urlencoded({extended: true}));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT;

app.use(cors());


const { connectDB } = require('./db');

(async () => {
    try {
        await connectDB();

        app.use('/user/sign', require('./Routes/Auth'));

        app.get('/', (req, res) => {
            res.send("Welcome");
        })

        app.listen(port, () => {
            console.log(`Welcome to http://localhost:${port}`)
        })


    } catch (error) {
console.log(error);
    }
})();


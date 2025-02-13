const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const connectDB = require('./db'); 
// const mongoose = require('mongoose');

// require('dotenv').config();

// connectDB().catch(err => console.log(err)); // Call connectDB function

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/ram',function(req,res){
    console.log('Data received:', req.body);  // Log the received data from the frontend
    res.send('ram')
})

const PORT = process.env.PORT || 3000;
console.log(PORT);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
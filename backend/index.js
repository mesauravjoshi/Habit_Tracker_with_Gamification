const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db');
require('dotenv').config();

connectDB().catch(err => console.log(err)); // Call connectDB function

const app = express();

app.use(cors());
app.use(bodyParser.json());

const authRoutes = require('./routes/auth');
const habit = require('./routes/habit');
const user = require('./routes/user');
const archiveHabit = require('./routes/archive');

app.use('/auth', authRoutes);
app.use('/habit', habit);
app.use('/user', user);
app.use('/archive', archiveHabit);

const PORT = process.env.PORT || 3000;
// console.log(PORT);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
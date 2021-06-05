const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const meetingRoutes = require('./routes/meeting');


// MongoDB Atlas Database Connectivity
mongoose.connect(`${process.env.MONGODB_ATLAS_URI}`, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log('Connected to Database');
    })
    .catch(err => {
        console.log('Connection Failed');
        console.log(err);
    });

// To parse request body
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, X-Requested-With, Accept');
    next();
});

//meeting routes for the app
app.use('/meeting', meetingRoutes);

// Error Handling Middleware
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
        message: message,
        data: data
    });
})

// app.listen(8080);
module.exports = app;
const express = require('express');
const { register } = require('../controllers/auth.controller');
const authRoute =express.Router();


//Register 
authRoute.post('/register', register);





module.exports = authRoute;
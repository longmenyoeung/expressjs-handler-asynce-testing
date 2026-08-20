const express = require('express');
const { register, login } = require('../controllers/auth.controller');
const authRoute =express.Router();


//Register 
authRoute.post('/register', register);
authRoute.post('/login', login);





module.exports = authRoute;
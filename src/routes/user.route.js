const express = require('express');
const { createUser } = require('../controllers/user.controller');
const userRouter  = express.Router();


userRouter.post('/', createUser);



module.exports = userRouter;
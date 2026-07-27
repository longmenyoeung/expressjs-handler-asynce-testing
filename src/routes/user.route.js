const express = require('express');
const { createUser, getAlluser, findUserById, updatUserById, deleteUserById } = require('../controllers/user.controller');
const userRouter  = express.Router();


userRouter.get('/', getAlluser);
userRouter.get('/:userId',findUserById);
userRouter.post('/', createUser);
userRouter.put('/:userId', updatUserById);
userRouter.delete('/:userId', deleteUserById);



module.exports = userRouter;
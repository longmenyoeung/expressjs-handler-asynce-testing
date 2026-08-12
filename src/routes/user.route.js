const express = require("express");
const {
    createUser,
    getAlluser,
    findUserById,
    updatUserById,
    deleteUserById,
} = require("../controllers/user.controller");
const userRouter = express.Router();
const { body } = require("express-validator");
const { createUservalidation, updateUservalidation, getListuserValiation } = require("../middleware/userValidator");

userRouter.get(
    "/",
    getListuserValiation,
    getAlluser
);

userRouter.get("/:userId", findUserById);
userRouter.post(
    "/",
    createUservalidation,
    createUser,
);
userRouter.put(
    "/:userId",
    updateUservalidation,
    updatUserById
);


userRouter.delete("/:userId", deleteUserById);

module.exports = userRouter;

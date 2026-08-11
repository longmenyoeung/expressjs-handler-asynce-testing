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
const { validateResult } = require("../middleware/index");

userRouter.get("/", getAlluser);
userRouter.get("/:userId", findUserById);
userRouter.post(
    "/",
    [
        body("name")
            .trim()
            .notEmpty()
            .withMessage('Name is required')
            .isAlpha('en-US')
            .withMessage('Only english alphabets allowed.'),
        body("email")
            .notEmpty()
            .withMessage('Email is required.')
            .trim()
            .normalizeEmail() //Sanitize email
            .isEmail()
            .withMessage('Invalid email.'),
        body("age")
            .isInt({ min: 18, max: 100 })
            .withMessage("Age must be between 18 to 100"),
    ],
    validateResult,
    createUser,
);
userRouter.put("/:userId", updatUserById);
userRouter.delete("/:userId", deleteUserById);

module.exports = userRouter;

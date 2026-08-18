const {body, query} = require('express-validator');
const {validate} = require('./validate')

exports.createUservalidation = [
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
    body("profile")
        .trim()
        .isMongoId()
        .withMessage("File must be mongoID"),
    validate
]

exports.updateUservalidation = [
    body('name')
    .optional()
    .trim(),
    body('email')
    .optional()
    .trim()
    .normalizeEmail()
    .isEmail(),
    body('age')
    .optional()
    .isInt({min:18, max:100})
    .withMessage("Age must be between 18 to 100"),
    validate
]


exports.getListuserValiation = [
    query('page')
    .optional()
    .isInt({min:1})
    .toInt(),

    query('limit')
    .optional()
    .isInt({min:1, max:100})
    .toInt(),

    validate
]
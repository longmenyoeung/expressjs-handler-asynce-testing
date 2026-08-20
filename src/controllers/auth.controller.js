const asyncHandler = require('express-async-handler');
const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt')
exports.register = asyncHandler(async (req, res) => {

    const { name, email, password, age } = req.body;

    //hash password
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new UserModel({ 
        name, 
        email, 
        password: hashedPassword, 
        age 
    });

     //check if email exist 
    const existed = await UserModel.findOne({ email });
    if (existed) {
        return res.status(400).json({ message: 'Email already existed.'});
    }


    await user.save();

    return res.status(201).json({
        message :'User created',
        user: user
    });



})
const UserModel = require("../models/UserModel");
const asyncHandler = require("express-async-handler");

exports.createUser = asyncHandler ( async (req, res) => {
    const {name, email, age} = req.body;
    const user = UserModel({name, email, age});
    await user.save();
    
    res.status(201).json({
        success : true,
        message : 'User created successfully',
        data  : user ,
    });

});
const UserModel = require("../models/UserModel");
const asyncHandler = require("express-async-handler");

exports.createUser = asyncHandler ( async (req, res) => {

    const {name, email, age} = req.body;
    const user = UserModel({name, email, age});
    await user.save();
    
    return res.status(201).json({
        success : true,
        message : 'User created successfully',
        data  : user ,
    });

});

exports.getAlluser  = asyncHandler (async (req, res) => {
    const users = await UserModel.find({isActive: true});

    return res.status(200).json({
        success : true,
        message: 'Get all users successfully',
        data : users
    });
});

exports.findUserById = asyncHandler (async (req, res) => {

    const userId = req.params.userId;

    const user = await UserModel.findById(userId);

    return res.status(200).json({
        success : true,
        message : 'User have been found.',
        data : user
    });

})

exports.updatUserById = asyncHandler (async (req, res) => {
    
    const user = await UserModel.findByIdAndUpdate(
        req.params.userId,
        req.body,
        {
            new : true,
            runValidators : true
        }
    )


    if(!user) {return res.status(404).json({message:'User not found.'});}

    return res.status(200).json({
        success: true,
        message : 'User updated successfully.',
        data : user
    });

});

exports.deleteUserById = asyncHandler (async (req, res) => {
    const userId = req.params.userId;
    const user = await UserModel.findByIdAndDelete(userId);

    if(!user) {return res.status(404).json({message: 'User not found.'});}

    return res.status(200).json({
        success : true,
        message  :'User deleted succesfully.',
        data : user
    })
})
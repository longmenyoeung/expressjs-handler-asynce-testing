const UserModel = require("../models/UserModel");
const asyncHandler = require("express-async-handler");

exports.createUser = asyncHandler ( async (req, res) => {

    const {name, email, age, profile} = req.body;
    
    const user = UserModel({name, email, age, profile});
    await user.save();
    
    return res.status(201).json({
        success : true,
        message : 'User created successfully',
        data  : user ,
    });

});

exports.getAlluser  = asyncHandler (async (req, res) => {
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const age  = parseInt(req.query.age);
    const isActive  = req.query.isActive;
    const query = {};
    if(req.query.age) query.age = age;
    if(req.query.isActive) query.isActive = isActive;

    const result = await UserModel.paginate(query, {
        page,
        limit
    });
    res.status(200).json(result);

});

exports.findUserById = asyncHandler (async (req, res) => {

    const userId = req.params.userId;

    const user = await UserModel.findById(userId);

    return res.status(200).json({
        success : true,
        message : 'User have been found.',
        data : user
    });

});

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
    });
});
const asyncHandler = require('express-async-handler');
const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


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

    const userRepsone = user.toObject();
    delete userRepsone.password

    return res.status(201).json({
        message :'User created',
        user: userRepsone
    });


});


exports.login = asyncHandler(async (req, res) => {

    const {email, password} = req.body;

     //check email invalid or not
    const user = await UserModel.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Email or password incorrect.'});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({ message: 'Email or password incorrect.'});
    }

    //Verify or Sign token
    const secret = process.env.JWT_SECRET;
    const refresh_secret = process.env.JWT_REFRESH_SECRET;
    const accessToken = jwt.sign(
        {
            sub:user._id, 
            email:user.email
        }, 
        secret, 
        {expiresIn: '15m'}
    );
    const refeshToken = jwt.sign(
        {
            sub:user._id, 
            email:user.email
        }, 
        refresh_secret, 
        {expiresIn: '3d'}
    );

    return res.status(200).json({
        accessToken,
        refeshToken
    });
})
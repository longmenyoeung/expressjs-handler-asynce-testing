const asyncHandlder = require('express-async-handler');
const  jwt  = require('jsonwebtoken');


exports.verifyToken = asyncHandlder (async(req, res, next) => {
    const authHeader  = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message:'Unauthorized'})
    }

    const token = authHeader.split(' ')[1]
    const secret = process.env.jwt_SECRET;
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
})
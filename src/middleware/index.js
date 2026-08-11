const {validationResult} = require('express-validator')
exports.logger = (req, res, next) => {
    console.log(`${req.method} ${req.path} ${req.originalUrl}`);
    next();
}

exports.validateResult  = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    next();
}

// exports.validator = (req, res, next) => {
//     if(req.body.name){ 
//         next();
//     }else{
//         res.status(400).json({error: 'Name required'});
//     }
// }
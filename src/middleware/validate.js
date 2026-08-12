const {validationResult} = require('express-validator');

exports.validate = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        // return res.status(400).json({errors:errors.array()});
        const formattedError = errors.array().map(err=> ({
            field: err.path,
            message: err.msg
        }));

        return res.status(400).json({
            success: false,
            errors: formattedError
        });
    }
    next();
}
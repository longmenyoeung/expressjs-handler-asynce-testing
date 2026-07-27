exports.logger = (req, res, next) => {
    console.log(`${req.method} ${req.path} ${req.originalUrl}`);
    next();
}

// exports.validator = (req, res, next) => {
//     if(req.body.name){ 
//         next();
//     }else{
//         res.status(400).json({error: 'Name required'});
//     }
// }
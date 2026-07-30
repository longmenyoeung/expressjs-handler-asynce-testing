const dotenv = require("dotenv/config");
const express = require('express');
const connectDB = require('./src/config/db');
const app = express();
const morgan = require('morgan');
const helmet  =require('helmet');
const userRouter = require('./src/routes/user.route');
const bookRoute = require("./src/routes/book.route");
const brandRoute = require("./src/routes/brand.route");


//PORT 
const PORT = process.env.PORT1  || process.env.PORT2

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('combined')); //use it check requast 
app.use(helmet()); // make it more security

connectDB();

//router
app.use('/api/users', userRouter);
app.use('/api/books', bookRoute);
app.use('/api/brands', brandRoute);


//5. Error-Handling Middleware ===
// Special middleware with 4 parameters:
app.use((err, req, res, next) =>{
    console.error(err.stack);
    res.status(500).json({
        error: err.message
    });
});
// ===============================

app.listen(PORT,() => {
    console.log(`Server running on http://localhost${PORT}`);
});
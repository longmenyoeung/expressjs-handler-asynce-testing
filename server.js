const dotenv = require("dotenv/config");
const express = require('express');
const connectDB = require('./src/config/db');
const app = express();
const morgan = require('morgan');
const helmet  =require('helmet');
const userRouter = require('./src/routes/user.route');
const bookRoute = require("./src/routes/book.route");
const brandRoute = require("./src/routes/brand.route");
const categoryRoute = require("./src/routes/category.route");
const productRoute = require("./src/routes/product.route");
const multer = require('multer');
const path = require('path')



//upload image
const storage = multer.diskStorage({
    destination: (req, file, cb) =>  {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const unique = Date.now() + '_' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '_' + unique + path.extname(file.originalname));
    }
}) 
const uploads = multer({storage: storage})


//PORT 
const PORT = process.env.PORT1  || process.env.PORT2

//middleware
app.use(express.json()); //json 
app.use(express.urlencoded({extended:true}));
app.use(morgan('combined')); //use it check requast 
app.use(helmet()); // make it more security

//connection with DB
connectDB();

//router
app.use('/api/users', userRouter);
app.use('/api/books', bookRoute);
app.use('/api/brands', brandRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/products', productRoute);

//tesing upload image
app.post('/upload', uploads.single('file'), (req,res) => {
    console.log(req.file)
    console.log(req.body)

    res.status(201).json({
        message: 'Uploaded file successfully.',
        file:req.file
    })
})


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
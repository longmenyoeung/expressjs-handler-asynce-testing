const dotenv = require("dotenv/config");
const express = require("express");
const connectDB = require("./src/config/db");
const cloudinary = require("cloudinary").v2;
// const aws = require("aws-sdk");
const { S3Client } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const userRouter = require("./src/routes/user.route");
const bookRoute = require("./src/routes/book.route");
const brandRoute = require("./src/routes/brand.route");
const categoryRoute = require("./src/routes/category.route");
const productRoute = require("./src/routes/product.route");
const multer = require("multer");
const path = require("path");
const fileRoute = require("./src/routes/file.route");
const authRoute = require("./src/routes/auth.route");
const { verifyToken } = require("./src/middleware/authMiddilewar");

//cloudinaryBufer
const storageBuffer = new multer.memoryStorage();

//aws testing config
// const s3 = new S3Client({
//     region: process.env.AWS_REGION,
//     credentials: {
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     },
// });

//1 upload image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const unique = Date.now() + "_" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "_" + unique + path.extname(file.originalname));
    },
});

//3
const filefilter = (req, file, cb) => {
    //allowed extension
    const allowedTypes = /jpeg|jpg|png|gif|webp/;

    //check extension
    const extname = allowedTypes.test(
        path.extname(file.originalname).toLowerCase(),
    );

    //check meme type
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error("Only image files (png, gif jpg, jpeg, webp) are allowed"));
    }
};

// 2
const uploads = multer({
    //upload file image
    // storage: storage, // with local
    storage: storageBuffer, // with cloudinary server
    //limit size of file image
    limits: {
        fileSize: 5 * 1024 * 1024, //limit 5m
    },
    //accept only file
    fileFilter: filefilter,
});

// aws S3 storage
// const uploadS3 = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: process.env.AWS_BUCKET_NAME,
//          acl: "public-read",
//         metadata: function (req, file, cb) {
//             cb(null, { fieldName: file.fieldname });
//         },
//         key: function (req, file, cb) {
//             const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//             cb(null, "uploads/" + uniqueSuffix + path.extname(file.originalname));
//         },
//     }),
//     limits: { fileSize: 5 * 1024 * 1024 },
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype.startsWith("image/")) {
//             cb(null, true);
//         } else {
//             cb(new Error("Only images allowed"));
//         }
//     },
// });
//PORT
const PORT = process.env.PORT1 || process.env.PORT2;

//middleware
app.use(express.json()); //json
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined")); //use it check requast
app.use(helmet()); // make it more security

//connection with DB
connectDB();

//clouidary testing config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const handleUpload = async (file) => {
    const res = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
    });
    return res;
};
//=======================


//router
app.use("/api/users",verifyToken, userRouter);
app.use("/api/books", bookRoute);
app.use("/api/brands", brandRoute);
app.use("/api/categories",verifyToken, categoryRoute);
app.use("/api/products",verifyToken, productRoute);
app.use('/api/files', fileRoute);
app.use('/api/auth', authRoute)

// 4============================ Kind of uploading image file
// ---> with local
app.post("/upload-single", uploads.single("file"), (req, res) => {
    console.log(req.file);
    console.log(req.body);

    res.status(201).json({
        message: "Uploaded file successfully.",
        file: req.file,
    });
});
// --> with cloudinary
app.post(
    "/upload-single-clouinary",
    uploads.single("my_file"),
    async (req, res) => {
        try {
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
            const cldRes = await handleUpload(dataURI);
            res.json(cldRes);
        } catch (error) {
            console.log(error);
            res.send({
                message: error.message,
            });
        }
    },
);

// --> with aws s3
// app.post("/upload-s3", uploadS3.single("image"), (req, res) => {

//     if(!req.file) {
//         return res.status(400).json({
//             success: false,
//             message: "No file uploaded"
//         });
//     }

//     res.json({
//         success: true,
//         message: "File uploaded to S3",
//         url: req.file.location, 
//     });
// });

app.post("/upload-multiple", uploads.array("file", 5), (req, res) => {
    console.log(req.files);
    console.log(req.body);

    res.status(201).json({
        message: `${req.files.length} files uploaded successfully`,
        files: req.files.map((f) => ({
            filename: f.filename,
            size: f.size,
            mimetype: f.mimetype,
        })),
    });
});

app.post("/upload-fields",uploads.fields([
        { name: "file", maxCount: 4 },
        { name: "photos", maxCount: 4 },
    ]),
    (req, res) => {

        console.log(req.files.file[0]);
        console.log(req.files.photos[0]);

        return res.status(201).json({
            message: "Upload files successfully",
            file: req.files.file[0].filename,
            photos: req.files.photos[0].filename,
        });
    },
);

//5. Error-Handling Middleware ===
// Special middleware with 4 parameters:
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: err.message,
    });
});
// ===============================


app.listen(PORT, () => {
    console.log(`Server running on http://localhost${PORT}`);
});

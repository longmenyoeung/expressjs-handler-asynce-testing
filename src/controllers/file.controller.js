const fileModel = require('../models/FileModel')
const asyncHandler = require('express-async-handler');



exports.createFile = asyncHandler (async (req, res) => {
// 1. Multer populates req.file for single file uploads
    if (!req.file) {
        return res.status(400).json({ // Changed to 400 (Bad Request)
            success: false,
            message: 'No file uploaded'
        });
    }

    // 2. If you are uploading directly to S3 via Multer (like multer-s3), 
    // the S3 URL is usually stored in req.file.location
    const url = req.file.location || req.file.path; 

    console.log("Uploaded File Details:", req.file);
    console.log("File URL:", url);

    await fileModel.create({ url });

    return res.status(201).json({
        success: true,
        message: 'File uploaded successfully.',
        url: url
    });
})
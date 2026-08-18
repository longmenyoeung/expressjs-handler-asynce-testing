const express = require("express");
const { createFile } = require("../controllers/file.controller");
const { uploadS3 } = require("../config/aws3Config");

const fileRoute = express.Router();



//3
fileRoute.post('/upload-s3',uploadS3.single('image'), createFile)




module.exports = fileRoute;

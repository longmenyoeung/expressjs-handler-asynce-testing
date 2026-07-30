const { Timestamp } = require("mongodb");
const { default: mongoose } = require("mongoose");
const { collection } = require("./BookModel");


const brandSchema = new mongoose.Schema({
    brand_name: {
        type : String,
        required: [true, 'Brand name field is required.'],
        unique: true,
        trim: true
    },
    isActive : {
        type: Boolean,
        default: true
    },
    description : {
        type: String,
        trim: true
    }
},{
    Timestamp: true,
    collection: 'brands'
});

const BrandModel = mongoose.model('Brand', brandSchema);
module.exports = BrandModel;
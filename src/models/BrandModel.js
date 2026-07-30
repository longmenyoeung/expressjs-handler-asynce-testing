const { Timestamp } = require("mongodb");
const { default: mongoose } = require("mongoose");
const { collection } = require("./BookModel");


const brandModel = mongoose.Schema({
    brand_name: {
        type : String,
        required: true,
        trim: true
    },
    isActive : {
        type: Boolean,
        default: true
    },
    description : {
        type: Text
    }
},{
    Timestamp: true,
    collection: 'brands'
});

const brandModel = mongoose.model('Brand', brandModel);
module.exports = brandModel;
const { Timestamp } = require("mongodb");
const { default: mongoose } = require("mongoose");
const { collection } = require("./BookModel");


const productSchema = mongoose.Schema({
    name:  {
        type : String,
        required: true,
        trim : true
    },
    category_id: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
        // index : true
    },
    brand_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    description : {
        type: Text,
    },
    price : {
        type : Number,
        required : true,
        default: 0
    },
    stock : {
        type : Number,
        required: true,
        default : 0
    }
},{
    Timestamp : true,
    collection: 'products'
});

const productModel = mongoose.model('Product', productSchema);
module.exports =productModel;
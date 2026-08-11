const { Timestamp } = require("mongodb");
const { default: mongoose } = require("mongoose");
const { collection } = require("./BookModel");
const mongoosePaginate  = require('mongoose-paginate-v2')



const productSchema = new mongoose.Schema({
    name:  {
        type : String,
        required: [true, 'Name field is required.'],
        trim : true
    },
    category_id: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
        index : true
    },
    brand_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true,
        index: true
    },
    description : {
        type: String,
        trim: true
    },
    price : {
        type : Number,
        required : [true,],
        default: 0
    },
    stock : {
        type : Number,
        required: true,
        default : 0
    }
    //note add more
    // -qty -isStock
},{
    Timestamp : true,
    collection: 'products'
});

productSchema.plugin(mongoosePaginate);

const ProductModel = mongoose.model('Product', productSchema);
module.exports = ProductModel;
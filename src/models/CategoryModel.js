const { Timestamp } = require("mongodb");
const { default: mongoose } = require("mongoose");
const { collection } = require("./BookModel");

const categorySchema = new mongoose.Schema({
    name : {
        type: String,
        required : true,
        unique: true,
        trim : true
    },
    isActive : {
        type: Boolean,
        default: true
    }
}, {
    Timestamp: true,
    collection : 'categoies'
});

const CategoryModel = mongoose.model('Category', categorySchema);
module.exports = CategoryModel;
const { Timestamp } = require("mongodb");
const { default: mongoose } = require("mongoose");
const { collection } = require("./BookModel");

const categorySchema = mongoose.Schema({
    name : {
        type: String,
        required : true,
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

const categoryModel = mongoose.model('Category', categorySchema);
module.exports = categoryModel;
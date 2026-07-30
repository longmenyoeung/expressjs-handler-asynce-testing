const { default: mongoose } = require("mongoose");
const { getYear, getRating, checkPrice } = require("../validator/BookModelValidate");


const boookSchema = new mongoose.Schema({
    title : {
        type: String,
        required : true,
        trim : true
    },
    author : {
        type: String,
        required: true,
        trim: true
    },
    category : {
        type: String,
        enum :['Math', 'English', 'History', 'Java', 'Program'],
        required: true
    },
    publishYear : {
        type : Number,
        required: true,
        validate : {
            validator : getYear,
            message:  'Year must be 1000 between curreent year.'
        }
    },
    page: {
        type:Number,
        required: true,
        min : 1
    },
    language: {
        type: String,
        default: 'English',
        trim : true
    },
    price : {
        type :Number,
        required: true,
        min: 0,
        default: 0,
    },
    stock : {
        type : Number,
        min: 0,
        required: true,
        default: 0
    },
    rating: {
        type : Number,
        validate: {
            validator : getRating,
            message: 'Ratting 0 between 5'
        },
        default : 0
    },
    isActive: {
        type: Boolean,
        default : true
    }

},{
    timestamps: true,
    collection : 'books'
});

const BookModel = mongoose.model('Book', boookSchema);
module.exports = BookModel;
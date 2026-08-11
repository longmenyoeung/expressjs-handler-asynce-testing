const { default: mongoose } = require("mongoose");
const mongoosePaginate  = require('mongoose-paginate-v2');
const { ageValidate } = require("../validator/UserModelValidate");

const userSchema  = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        trim: true
    },
    email : {
        type:String,
        required: [true, 'Email is required.'],
        unique: true
    },
    age: {
        type: Number,
        // validate: {
        //     validator : ageValidate,
        //     message : 'Age must be between 18 and 100'
        // }
    },
    isActive : {
        type: Boolean,
        required: true,
        default : true
    }
},{
    timestamps: true,
    collection: 'users'
});

//add paginate plugin
userSchema.plugin(mongoosePaginate);

//create model from shema
const UserModel  =  mongoose.model('User', userSchema);

module.exports = UserModel;

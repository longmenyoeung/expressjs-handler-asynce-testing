const { default: mongoose } = require("mongoose");

const fileSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        trim: true
    }
},{
    timestamps: true,
    collection: 'files'
});

const fileModel = mongoose.model('File', fileSchema);
module.exports  = fileModel;
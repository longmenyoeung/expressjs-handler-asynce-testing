const asyncHandler = require('express-async-handler');
const BookModel = require('../models/BookModel');

exports.getAllbooks = asyncHandler (async (req, res) => {

    const book = await BookModel.find({isActive: true});

    if(book.length === 0) {return res.status(404).json({message :'Book is empty.', data: []})}

    return res.status(200).json({
        success : true,
        message : 'Get all books successfully.',
        total_books : book.length,
        data: book
    });
});

exports.createBooks = asyncHandler (async(req, res) => {
    const {title,author, category, publishYear,page,price,stock, rating} = req.body;
    const book = await BookModel.create({title,author,category,publishYear, page,price,stock,rating });

    return res.status(201).json({
        success: true,
        message: 'Book created successfully.',
        data: req.body
    });

});

exports.findBookById = asyncHandler (async (req, res) => {
    const bookId = req.params.bookId;
    const book = await BookModel.findById(bookId);

    return res.status(200).json({
        success: true,
        message: 'Book have been found'
    });

});

exports.updateBookById = asyncHandler (async (req, res) => {
    // const bookId = req.params.bookId;
    const book = await BookModel.findByIdAndUpdate(
        req.params.bookId,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    if(!book) {return res.status(404).json({message: 'Book not found.', data: []});}

    return res.status(200).json({
        success: true,
        message : 'Book updated successfully.',
        data: book
    });
});

exports.deleteBookById  = asyncHandler (async (req, res) => {
    const bookId = req.params.bookId;
    const book = await BookModel.findByIdAndDelete(bookId);
    if(!book){return res.status(404).json({message: 'Book not found.', data :[]});}
    return res.status(200).json({
        success : true,
        message: 'Book deleted successfully.',
        data : book
    })
})
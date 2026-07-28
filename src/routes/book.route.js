
const express = require('express');
const { getAllbooks, createBooks, findBookById, updateBookById, deleteBookById} = require('../controllers/book.controller');
const bookRoute  = express.Router();

bookRoute.get('/', getAllbooks);
bookRoute.post('/', createBooks);
bookRoute.get('/:bookId', findBookById);
bookRoute.put('/:bookId', updateBookById);
bookRoute.delete('/:bookId', deleteBookById);

module.exports = bookRoute;
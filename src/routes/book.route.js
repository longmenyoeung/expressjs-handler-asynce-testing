
const express = require('express');
const { getAllbooks, createBooks, findBookById, updateBookById, deleteBookById, sortPriceDesc, sortPriceAsc} = require('../controllers/book.controller');
const bookRoute  = express.Router();

bookRoute.get('/', getAllbooks);
bookRoute.get('/sort-desc-price', sortPriceDesc);
bookRoute.get('/sort-asc-price', sortPriceAsc);
bookRoute.post('/', createBooks);
bookRoute.get('/:bookId', findBookById);
bookRoute.put('/:bookId', updateBookById);
bookRoute.delete('/:bookId', deleteBookById);

module.exports = bookRoute;
const express = require('express');
const { 
    getlistCategory, 
    createCategory, 
    searchCategory, 
    updateCategory, 
    deleteCategory 
} = require('../controllers/category.controller');

const categoryRoute = express.Router();

categoryRoute.get('/', getlistCategory);
categoryRoute.post('/', createCategory);
categoryRoute.get('/:categoryId', searchCategory);
categoryRoute.put('/:categoryId', updateCategory);
categoryRoute.delete('/:categoryId', deleteCategory);


module.exports = categoryRoute;
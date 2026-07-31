const express = require('express');
const { createProduct, getAllProuct, searchProduct, updateProduct, deleteProduct, sortByPriceASC, sortByPriceDESC } = require('../controllers/product.controller');
const productRoute = express.Router();

productRoute.get('/', getAllProuct);
productRoute.get('/sort-asc-price', sortByPriceASC);
productRoute.get('/sort-desc-price', sortByPriceDESC);
productRoute.post('/', createProduct);
productRoute.get('/:productId', searchProduct);
productRoute.put('/:productId', updateProduct);
productRoute.delete('/:productId', deleteProduct);

module.exports = productRoute;
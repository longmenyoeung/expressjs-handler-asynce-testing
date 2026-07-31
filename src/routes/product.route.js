const express = require('express');
const { createProduct, getAllProuct, searchProduct, updateProduct, deleteProduct } = require('../controllers/product.controller');
const productRoute = express.Router();

productRoute.get('/', getAllProuct);
productRoute.post('/', createProduct);
productRoute.get('/:productId', searchProduct);
productRoute.put('/:productId', updateProduct);
productRoute.delete('/:productId', deleteProduct);

module.exports = productRoute;
const express = require('express');
const { getAllBrands, createBrand, updateBrand, deleteBrand , searchBrand} = require('../controllers/brand.controller');
const brandRoute = express.Router()


brandRoute.get('/', getAllBrands);
brandRoute.post('/', createBrand);
brandRoute.get('/:brandId', searchBrand)
brandRoute.put('/:brandId', updateBrand);
brandRoute.delete('/:brandId', deleteBrand);


module.exports = brandRoute;
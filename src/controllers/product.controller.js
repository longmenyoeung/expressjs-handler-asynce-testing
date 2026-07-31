const asyncHandler = require('express-async-handler');
const ProductModel = require('../models/ProductModel');
const CategoryModel = require('../models/CategoryModel');
const BrandModel = require('../models/BrandModel');

exports.getAllProuct = asyncHandler (async (req, res) => {

    const products = await ProductModel.find({})
                                        .populate('category_id', 'name')
                                        .populate('brand_id', 'brand_name')

    if(products.length === 0) {return res.status(400).json({message: 'Product is empty.', data : []})}

    return res.status(200).json({
        success: true,
        message: 'Get all products successfully.',
        total_products : products.length,
        data : products
    });

});

exports.createProduct = asyncHandler (async (req, res) => {

    const {name, category_id, brand_id, description, price, stock} = req.body;

    const categoryId = await CategoryModel.findById(category_id);
    if(!categoryId) {return res.status(404).json({message : 'Category not found.'});}

    const brandId = await BrandModel.findById(brand_id);
    if(!brandId) {return res.status(404).json({message: 'Brand not found.'})}

    const product = new ProductModel({
        name, category_id, brand_id, description, price, stock
    });

    await product.save();

    return res.status(201).json({
        success : true,
        message: 'Product created successfully.',
        data : product
    });

});

exports.searchProduct = asyncHandler (async (req, res) => {
    const productId = req.params.productId;
    const product = await ProductModel.findById(productId);

    if(!product) {return res.status(404).json({message: 'Product not found.'})}

    return res.status(200).json({
        success : true,
        message : 'Product found successfully.',
        data : product
    });

});

exports.updateProduct = asyncHandler (async (req, res) => {
    const dataInput = {name, category_id, brand_id, description, price, stock} = req.body;
    const product = await ProductModel.findByIdAndUpdate(
        req.params.productId,
        dataInput,
        {
            new : true,
            runValidators: true
        }
    )
    .populate('category_id', 'name')
    .populate('brand_id', 'brand_name');

    if(!product) {return res.status(404).json({message: 'Product not found.'})}

    const catetgory = await CategoryModel.findById(category_id);
    if(!catetgory) {return res.status(404).json({message : 'Category not found.'})}

    const brand = await BrandModel.findById(brand_id);
    if(!brand) {return res.status(404).json({message : 'Brand not found.'})}


    return res.status(200).json({
        success: true,
        message: 'Product updated successfully.',
        data : product
    })

});

exports.deleteProduct = asyncHandler (async (req, res) => {
    const productId = req.params.productId;
    const product = await ProductModel.findByIdAndDelete(productId);

    if(!product) {return res.status(404).json({message : 'Product not found.'})}

    return res.status(200).json({
        success: true,
        message : 'Product deleted successfully.',
        data: product
    });

});

exports.sortByPriceASC = asyncHandler (async (req, res) => {
    const product = await ProductModel.find().sort({price : 1}); // ASC

    return res.status(200).json({
        success : true,
        message: 'Sorted by price asc',
        data : product
    });
});

exports.sortByPriceDESC  = asyncHandler (async (req, res) => {
    const product = await ProductModel.find().sort({price : -1}); //DESC
    return res.status(200).json({
        success : true,
        message: 'Sorted by price desc',
        data : product
    });
})
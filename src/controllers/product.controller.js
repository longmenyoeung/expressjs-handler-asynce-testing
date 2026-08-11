const asyncHandler = require('express-async-handler');
const ProductModel = require('../models/ProductModel');
const CategoryModel = require('../models/CategoryModel');
const BrandModel = require('../models/BrandModel');

exports.getAllProuct = asyncHandler(async (req, res) => {
    const price = parseInt(req.query.price);
    const stock = parseInt(req.query.stock);

    let query = {};
    let sortQuery = {};

    //filter exactly price
    if (price) query.price = price;

    //filter stock
    if (stock) query.stock = stock;

    //filter rang price
    const { minPrice, maxPrice } = req.query;
    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    //search name
    if (req.query.name) query.name = { $regex: req.query.name, $options: 'i' }

    if (req.query.sort === 'asc') {
        sortQuery.price = 1 // cheap first
    } else if (req.query.sort === 'desc') {
        sortQuery.price = -1; //exspensive
    } else {
        sortQuery.creatAt = -1;  // Default fallback sort
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const products = await ProductModel.paginate(query, { page, limit, sort:sortQuery})

    return res.status(200).json({
        succes: true,
        appliedFilters: query,
        data: products
    });
});

exports.createProduct = asyncHandler(async (req, res) => {

    const { name, category_id, brand_id, description, price, stock } = req.body;

    const categoryId = await CategoryModel.findById(category_id);
    if (!categoryId) { return res.status(404).json({ message: 'Category not found.' }); }

    const brandId = await BrandModel.findById(brand_id);
    if (!brandId) { return res.status(404).json({ message: 'Brand not found.' }) }

    const product = new ProductModel({
        name, category_id, brand_id, description, price, stock
    });

    await product.save();

    return res.status(201).json({
        success: true,
        message: 'Product created successfully.',
        data: product
    });

});

exports.searchProduct = asyncHandler(async (req, res) => {
    const productId = req.params.productId;
    const product = await ProductModel.findById(productId);

    if (!product) { return res.status(404).json({ message: 'Product not found.' }) }

    return res.status(200).json({
        success: true,
        message: 'Product found successfully.',
        data: product
    });

});

exports.updateProduct = asyncHandler(async (req, res) => {
    const dataInput = { name, category_id, brand_id, description, price, stock } = req.body;
    const product = await ProductModel.findByIdAndUpdate(
        req.params.productId,
        dataInput,
        {
            new: true,
            runValidators: true
        }
    )
        .populate('category_id', 'name')
        .populate('brand_id', 'brand_name');

    if (!product) { return res.status(404).json({ message: 'Product not found.' }) }

    const catetgory = await CategoryModel.findById(category_id);
    if (!catetgory) { return res.status(404).json({ message: 'Category not found.' }) }

    const brand = await BrandModel.findById(brand_id);
    if (!brand) { return res.status(404).json({ message: 'Brand not found.' }) }


    return res.status(200).json({
        success: true,
        message: 'Product updated successfully.',
        data: product
    })

});

exports.deleteProduct = asyncHandler(async (req, res) => {
    const productId = req.params.productId;
    const product = await ProductModel.findByIdAndDelete(productId);

    if (!product) { return res.status(404).json({ message: 'Product not found.' }) }

    return res.status(200).json({
        success: true,
        message: 'Product deleted successfully.',
        data: product
    });

});

exports.sortByPriceASC = asyncHandler(async (req, res) => {
    const product = await ProductModel.find().sort({ price: 1 }); // ASC

    return res.status(200).json({
        success: true,
        message: 'Sorted by price asc',
        data: product
    });
});

exports.sortByPriceDESC = asyncHandler(async (req, res) => {
    const product = await ProductModel.find().sort({ price: -1 }); //DESC
    return res.status(200).json({
        success: true,
        message: 'Sorted by price desc',
        data: product
    });
})
const asyncHandler = require('express-async-handler');
const BrandModel = require('../models/BrandModel');

exports.getAllBrands = asyncHandler (async (req, res) => {

    const brands = await BrandModel.find({});

    if(brands.length == 0 ){
        return res.status(200).json({message: 'Brand is empty.'});
    }

    return res.status(200).json({
        success: true,
        message : 'Get all brands successfully.',
        total_brand : brands.length,
        data: brands
    });

});

exports.createBrand = asyncHandler (async (req, res) => {

    const {brand_name, description} = req.body;

    // if(brand_name === '') {return res.status(400).json({message: 'Brand name field is required.'})}

    const brand = await BrandModel.create({brand_name, description});
    
    return res.status(201).json({
        success: true,
        message : 'Brand created successfully.',
        data : brand
    });

});

exports.updateBrand = asyncHandler (async (req, res) => {

    const brand = await BrandModel.findByIdAndUpdate(
        req.params.brandId,
        req.body,
        {
            new : true,
            runValidators : true
        }
    );

    if(!brand) {
        return res.status(404).json({message : 'Brand not found.', data: []});
    }

    return res.status(200).json({
        success : true,
        message : 'Brand updated successfully.',
        data: brand
    });

});

exports.searchBrand = asyncHandler (async (req, res) => {

    const brandId = req.params.brandId; 
    const brand = await BrandModel.findById(brandId);

    return res.status(200).json({
        success: true,
        message :'Get brand successfully',
        data : brand
    });
})

exports.deleteBrand  = asyncHandler (async (req, res) => {
    const brandId = req.params.brandId;
    const brand = await BrandModel.findByIdAndDelete(brandId);

    if(!brand) {return res.status(404).json({message: 'Brand not found.', data : []})}

    return res.status(200).json({
        success: true ,
        message : `Brand deleted successfully.`,
        data: brand
    });
})
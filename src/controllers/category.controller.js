const asyncHandlder = require('express-async-handler');
const CategoryModel = require('../models/CategoryModel');


exports.getlistCategory = asyncHandlder (async (req, res) => {

    const category = await CategoryModel.find({});

    if(category.length === 0) {return res.status(400).json({message: 'Category is empty.', data : []})}

    return res.status(200).json({
        success : true,
        message : 'Get all categoires successfully.',
        total_categories : category.length,
        data: category
    });
});

exports.searchCategory = asyncHandlder (async (req, res) => {

    const categoryId = req.params.categoryId;
    const category = await CategoryModel.findById(categoryId);

    if(!category) {return res.status(404).json({message : 'Category not found.'})}

    return res.status(200).json({
        success  : true,
        message : 'Category have been found.',
        data : category
    });

});

exports.createCategory = asyncHandlder (async (req, res) => {
    const {name} = req.body;

    const category = await CategoryModel.create({name});

    return res.status(201).json({
        success : true,
        message : 'Category created successfully.',
        data : category
    });
});

exports.updateCategory = asyncHandlder (async (req, res) => {

    const category = await CategoryModel.findByIdAndUpdate(
        req.params.categoryId,
        req.body,
        {
            new : true,
            runValidators: true
        }
    );

    if(!category) {
        return res.status(404).json({message: 'Category not found.'});
    }

    return res.status(200).json({
        success: true,
        message:'Category updated successfully.',
        data: category
    });

});

exports.deleteCategory = asyncHandlder (async (req, res) => {
    const categoryId = req.params.categoryId;

    const category = await CategoryModel.findByIdAndDelete(categoryId);

    if(!category) {
        return res.status(404).json({message : 'Category not found.'});
    }

    return res.status(200).json({
        success : true,
        message : 'Category deleted successfully.',
        data : category
    });

})
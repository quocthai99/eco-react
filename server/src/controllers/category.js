import asyncHandler from "express-async-handler"

const Category = require('../models/category')

export const getCategories = asyncHandler(async(req, res) => {
    const response = await Category.find()
    return res.status(200).json({
        success: true,
        categories: response
    })
})
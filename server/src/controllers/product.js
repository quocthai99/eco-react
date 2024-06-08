import asyncHandler from 'express-async-handler'
import slugify from 'slugify'

const Product = require('../models/product')


export const createProduct = asyncHandler(async(req, res) => {
    if ( Object.keys(req.body).length === 0 ) throw new Error('Missing input')
    if ( req.body && req.body.title ) req.body.slug = slugify(req.body.title)
    
    const newProduct = await Product.create(req.body)
    return res.status(200).json({
        success: newProduct ? true : false,
        createProduct: newProduct ? newProduct : 'Cannot create new product'
    })
})

export const getProduct = asyncHandler(async(req, res) => {
    const { pid } = req.params
    if ( !pid ) throw new Error('Missing inputs')
    const product = await Product.findById(pid)
    return res.status(200).json({
        success: product ? true : false,
        product: product ? product : 'Cannot get product'
    })
})

export const getProducts = asyncHandler(async(req, res) => {
    const queryObj = { ...req.query }
    const excludedFields = ['page', 'limit', 'fields', 'sort']
    excludedFields.forEach(el => delete queryObj[el])

    let queryString = JSON.stringify(queryObj)
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    const query = JSON.parse(queryString)
    
    if ( queryObj.title ) query.title = { $regex: query.title, $options: 'i' }
    if ( queryObj.category ) query.category = { $regex: query.category, $options: 'i' }
    if ( queryObj.color ) query.color = { $regex: query.color, $options: 'i' }

    let queries = Product.find(query)
    
    if ( req.query.sort ) {
        const sortBy = req.query.sort.split(',').join(' ')
        queries = queries.sort(sortBy)
    }

    if ( req.query.fields ) {
        const fieldsBy = req.query.fields.split(',').join(' ')
        queries = queries.select(fieldsBy)
    }

    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 10
    const skip = (page - 1) * limit

    queries = queries.skip(skip).limit(limit)

    const products = await queries
    return res.status(200).json({
        success: products ? true : false,
        counts: products.length,
        products: products ? products : 'Cannot get products',
    })
})

export const updateProduct = asyncHandler(async(req, res) => {
    const { pid } = req.params
    if ( !pid || Object.keys(req.body).length === 0) throw new Error('Missing input')
    if ( req.body && req.body.title ) req.body.slug = slugify(req.body.title)
    
    const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {new: true})
    return res.status(200).json({
        success: updatedProduct ? true : false,
        updatedProduct: updatedProduct ? updatedProduct : 'Cannot update product'
    })
})

export const  deleteProduct = asyncHandler(async(req, res) => {
    const { pid } = req.params
    if ( !pid ) throw new Error('Missing inputs')

    const deletedProduct = await Product.findByIdAndDelete(pid)
    return res.status(200).json({
        success: deletedProduct ? true : false,
        deletedProduct: deletedProduct ? 'Deleted' : 'Cannot delete product'
    })
})

export const ratings = asyncHandler(async(req, res) => {
    const { _id } = req.user
    const { star, comment, pid } = req.body
    
    if ( !star || !pid ) throw new Error('Missing inputs')
    const product = await Product.findById(pid)
    const userRating = product.ratings.find(user => user.postedBy.toString() === _id )
    if ( userRating ) {
        // user da danh gia: update rating
        await Product.updateOne({ratings: { $elemMatch: userRating }}, { $set: { "ratings.$.star": star, "ratings.$.comment": comment } }, { new: true })
    } else {
        // user chua danh gia: add rating
        await Product.findByIdAndUpdate(pid, { $push: { ratings: { star, postedBy: _id, comment } }}, { new: true })
    }

    const updatedProduct = await Product.findById(pid)
    const ratingCount = updatedProduct.ratings.length
    const sumRatings = updatedProduct.ratings.reduce((sum, el) => sum + el.star, 0  )
    
    updatedProduct.totalRatings = sumRatings / ratingCount

    await updatedProduct.save()

    return res.status(200).json({
        success: true,
        updatedProduct
    })
})

// find() tat ca product
// find({ rating: value }) => render ra product co rating: value
// updateOne({}) update tat ca product
// updateOne({rating: value}) => update product co rating: value
//updateOne({ratings: { $elemMatch: userRating }}, { $set: { title: 'test' } }, { new: true }) => { $set: { sua cung cap }}
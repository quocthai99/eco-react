import express from 'express'

import * as productControllers from '../controllers/product';
import { verifyAccessToken, isAdmin } from '../middlewares/verifyToken'
import uploader from '../config/cloudinary.config'

const router = express.Router()

router.post('/', verifyAccessToken, isAdmin, uploader.fields([
    {name: 'images', maxCount: 10},
    {name: 'thumb', maxCount: 1}
]) , productControllers.createProduct)
router.get('/:pid',  productControllers.getProduct)
router.get('/',  productControllers.getProducts)
router.delete('/:pid', verifyAccessToken, isAdmin,  productControllers.deleteProduct)
router.put('/ratings', verifyAccessToken, productControllers.ratings)
router.put('/:pid', verifyAccessToken, isAdmin, uploader.fields([
    {name: 'images', maxCount: 10},
    {name: 'thumb', maxCount: 1}
]), productControllers.updateProduct)

export default router
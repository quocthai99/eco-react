import express from 'express'

import * as productControllers from '../controllers/product';
import { verifyAccessToken, isAdmin } from '../middlewares/verifyToken'

const router = express.Router()

router.post('/', verifyAccessToken, isAdmin,  productControllers.createProduct)
router.get('/:pid',  productControllers.getProduct)
router.get('/',  productControllers.getProducts)
router.delete('/:pid', verifyAccessToken, isAdmin,  productControllers.deleteProduct)
router.put('/ratings', verifyAccessToken, productControllers.ratings)
router.put('/:pid', verifyAccessToken, isAdmin, productControllers.updateProduct)

export default router
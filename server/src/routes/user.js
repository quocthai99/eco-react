import express from 'express'

import * as userControllers from '../controllers/user'
import { verifyAccessToken, isAdmin } from '../middlewares/verifyToken'
import uploader from '../config/cloudinary.config'

const router = express.Router()

router.post('/register', userControllers.register)
router.put('/current',verifyAccessToken, uploader.single('avatar'), userControllers.updateUser)
router.put('/finalregister/:token', userControllers.finalregister)    
router.post('/login', userControllers.login)
router.get('/current',verifyAccessToken, userControllers.getCurrent)
router.post('/refreshToken', userControllers.refreshAccessToken)
router.get('/logout', userControllers.logout)
router.post('/forgotpassword', userControllers.forgotPassword)
router.post('/resetpassword', userControllers.resetPassword)
router.get('/',verifyAccessToken, isAdmin, userControllers.getUsers)
router.delete('/:uid',verifyAccessToken, isAdmin, userControllers.deleteUser)
router.put('/:uid',verifyAccessToken, isAdmin, userControllers.updateUserByAdmin)



export default router
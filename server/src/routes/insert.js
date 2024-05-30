import express from 'express'

import * as insertControllers from '../controllers/insert'
const router = express.Router()

router.post('/', insertControllers.insert2)


export default router
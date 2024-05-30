import { errHandler, notFound } from '../middlewares/errorHandler'
import userRouter from './user'
import insertRouter from './insert'
import categoryRouter from './category'
import productRouter from './product'

const initRoutes = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/category', categoryRouter)
    app.use('/api/product', productRouter)
    app.use('/api/insert', insertRouter)

    app.use(notFound)
    app.use(errHandler)
}

export default initRoutes
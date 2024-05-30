import express from 'express'
import cors from 'cors'
require('dotenv').config()
import cookieParser from 'cookie-parser'

import initRoutes from './src/routes'
import connetDatabase from './src/config/connectDatabase'

const app = express()
app.use(cookieParser())

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

initRoutes(app)
connetDatabase()


const port = process.env.PORT || 8888
const listener = app.listen(port, () => {
    console.log(`Server is running on the port ${listener.address().port}`)
})
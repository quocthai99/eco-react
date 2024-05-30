import mongoose from 'mongoose'
require('dotenv').config()

const connetDatabase = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI)
        if (connect.connection.readyState === 1) console.log('DB connection is successfully')
        else console.log('Connect is failed')
    } catch (error) {
        throw new Error(error)
    }
}

export default connetDatabase
const User = require('../models/user')
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import makeToken from 'uniqid'

import { generateAccessToken, generateRefreshToken } from '../middlewares/jwt'
import sendMail from '../ultils/sendMail'

// export const register = asyncHandler(async(req, res) => {
//     const { email, password, firstname, lastname } = req.body
//     if( !email || !password || !firstname || !lastname ) return res.status(400).json({
//         success: false,
//         mes: 'Missing inputs'
//     })
//     const user = await User.findOne({ email })
//     if (user) throw new Error('User existed')
//     else {
//         const newUser = await User.create(req.body)
//         return res.status(200).json({
//             success: newUser ? true : false,
//             mes: newUser ? 'Register is successfully' : 'Register is failed'
//         })
//     }
// })

export const register = asyncHandler(async(req, res) => {
    const { email, password, firstname, lastname, mobile } = req.body
    if( !email || !password || !firstname || !lastname || !mobile ) return res.status(400).json({
        success: false,
        mes: 'Missing inputs'
    })
    const user = await User.findOne({ email })
    if ( user ) throw new Error('User has existed')
    else {
        const token = makeToken()
        const emailEdited = btoa(email) + '@' + token
        const newUser = await User.create({
            email: emailEdited,
            password,
            firstname,
            lastname,
            mobile
        })
        if ( newUser ) {
            const html = `<h2>Register code</h2><br /><blockquote>${token}</blockquote>`
            await sendMail({ email, html, subject: 'Confirm register account'})
        }
        setTimeout(async() => {
            await User.deleteOne({email: emailEdited})
        },[300000])
        return res.json({
            success: newUser ? true : false,
            mes: newUser ? 'Please check your mail to active account' : 'Something went wrong'
        })

    }         
})

export const finalregister = asyncHandler(async(req, res) => {
    // const cookie = req.cookies
    const { token } = req.params
    // if (!cookie || cookie?.dataregister?.token !== token ) {
    //     res.clearCookie('dataregister')
    //     return res.redirect(`${process.env.CLIENT_URL}/finalregister/failed`)
    // }
    const notActivedEmail = await User.findOne({ email: new RegExp(`${token}$`)})
    if ( notActivedEmail ) {
        notActivedEmail.email = atob(notActivedEmail.email.split('@')[0])
        notActivedEmail.save()
    }
    return res.json({
        success: notActivedEmail ? true : false,
        mes: notActivedEmail ? 'Register is successfully, Please Login' : 'Something went wrong'
    })
    // const newUser = await User.create({
    //     email: cookie?.dataregister?.email,
    //     password: cookie?.dataregister?.password,
    //     mobile: cookie?.dataregister?.mobile,
    //     firstname: cookie?.dataregister?.firstname,
    //     lastname: cookie?.dataregister?.lastname,
    // })
    // res.clearCookie('dataregister')
    // if (newUser) return res.redirect(`${process.env.CLIENT_URL}/finalregister/success`)
    // else return res.redirect(`${process.env.CLIENT_URL}/finalregister/failed`)
})

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if( !email || !password ) return res.status(400).json({
        success: false,
        mes: 'Missing inputs'
    })

    const response = await User.findOne({ email })
    if (response &&  response.isCorrectPassword(password)) {
        const { password, role, ...userData } = response.toObject()
        const accessToken = generateAccessToken(response._id, role)
        const refreshToken = generateRefreshToken(response._id)
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000})
        await User.findByIdAndUpdate(response._id, { refreshToken }, { new: true } )
        return res.status(200).json({
            success: true,
            accessToken,
            userData
        })
        
    } else {
        throw new Error('Invalid credential!')
    }
    
})

export const getCurrent = asyncHandler(async(req, res) => {
    const { _id } = req.user
    const user = await User.findById(_id).select('-refreshToken')
    return res.status(200).json({
        success: user ? true : false,
        user: user ? user : 'User not found'
    })
})

export const refreshAccessToken = asyncHandler(async(req, res) => {
    const cookie = req.cookies
    if(!cookie && !cookie.refreshToken ) throw new Error('No refreshtoken in cookies')

    const response = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET)
    const result = await User.findOne({ _id: response._id, refreshToken: cookie.refreshToken })
    return res.status(200).json({
        success: result ? true : false,
        newAccessToken: result ? generateAccessToken(result._id, result.role) : 'refreshToken not matched'
    })
})

export const logout = asyncHandler(async(req, res) => {
    const cookie = req.cookies
    await User.findOneAndUpdate({ refreshToken: cookie.refreshToken}, {refreshToken: ''}, { new: true })
    res.clearCookie('refreshToken', { httpOnly: true, secure: true })
    return res.status(200).json({
        success: true,
        mes: 'Logout is done'
    })
})

export const forgotPassword = asyncHandler(async(req, res) => {
    // query = ?query
    // params = /params
    const { email } = req.body
    if ( !email ) throw new Error('email not found')
    const user = await User.findOne({ email })
    if (!user) throw new Error('user not exist')
    const resetToken = user.createPasswordChangedToken()
    await user.save()

    const html = `Xin vui lòng click vào link dưới đây để đổi mật khẩu. Link này sẽ hết hạn sau 15 phút. <a href=${process.env.CLIENT_URL}/reset-password/${resetToken}>Click here</a>`

    const data = {
        email,
        html,
        subject: 'Forgot password'
    }
    const rs = await sendMail(data)
    
    return res.status(200).json({
        success: rs.response?.includes('OK') ? true : false,
        mes: rs.response?.includes('OK') ? 'Check your email' : 'Email expired or wrong'
    })

})

export const resetPassword = asyncHandler(async(req, res) => {
    const { password, token } = req.body
    if (!password || !token ) throw new Error('Missing inputs')
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({ passwordResetToken, passwordResetExpired: { $gt: Date.now() }})
    if ( !user ) throw new Error('Invalid reset token')
    user.password = password
    user.passwordResetToken = undefined
    user.passwordChangedAt = Date.now()
    user.passwordResetExpired = undefined
    await user.save()
    return res.status(200).json({
        success: user ? true : false,
        mes: user ? "Updated" : "Something went wrong"
    })
})

export const getUsers = asyncHandler(async(req, res) => {
    const queryObj = { ...req.query }
    const excludedFields = ['page', 'limit', 'fields', 'sort']
    excludedFields.forEach(el => delete queryObj[el])

    let queryString = JSON.stringify(queryObj)
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    const query = JSON.parse(queryString)
    
    if (queryObj.q) {
        delete query.q
        query['$or'] = [
                {firstname: { $regex: queryObj.q, $options: 'i' }},
                {lastname: { $regex: queryObj.q, $options: 'i' }},
                {email: { $regex: queryObj.q, $options: 'i' }},
            ]
        
    }
    
    let queries = User.find(query)
    
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

    const users = await queries
    return res.status(200).json({
        success: users ? true : false,
        counts: users.length,
        users: users ? users : 'Cannot get users',
    })

    // const response = await User.find().select('-password -refreshToken')
    // return res.status(200).json({
    //     success: response ? true : false,
    //     users: response
    // })
})

export const deleteUser = asyncHandler(async(req, res) => {
    const { _id } = req.query
    if ( !_id ) throw new Error('Missing input')
    const response = await User.findByIdAndDelete(_id)
    return res.status(200).json({
        success: response ? true : false,
        deletedUser: response ? `User with email ${response.email}` : 'No delete user'
    })
})

export const updateUser = asyncHandler(async(req, res) => {
    const { _id } = req.user
    if ( !_id || Object.keys(req.body).length === 0 ) throw new Error('Missing input')
    const response = await User.findByIdAndUpdate(_id, req.body, { new: true }).select('-password -refreshToken')
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'No update user'
    })
})

export const updateUserByAdmin = asyncHandler(async(req, res) => {
    const { uid } = req.params
    if ( !uid || Object.keys(req.body).length === 0 ) throw new Error('Missing input')
    const response = await User.findByIdAndUpdate(uid, req.body, { new: true }).select('-password -refreshToken')
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'No update user'
    })
})
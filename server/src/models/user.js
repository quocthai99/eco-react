const mongoose = require('mongoose'); // Erase if already required
import bcrypt from 'bcrypt'
import crypto from 'crypto'

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:'user',
    },
    avatar:{
        type:String,
    },
    cart:{
        type:Array,
        default:[],
    },
    address: [
        {type: mongoose.Types.ObjectId, ref: 'Address'}
    ],
    wishlist: [{type: mongoose.Types.ObjectId, ref: 'Product'}],
    isBlocked: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String,
    },
    passwordChangeAt: {
        type: String,
    },
    passwordResetToken: {
        type: String
    },
    passwordResetExpired: {
        type: String
    },
    registerToken:{
        type:String,
    }
}, {
    timestamps: true
});

const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

userSchema.pre('save', async function(next) {
   if(!this.isModified('password')) return next()
    this.password = await hashPassword(this.password)
})

userSchema.methods = {
    isCorrectPassword: function (password) {
        return bcrypt.compareSync(password, this.password)
    },
    createPasswordChangedToken: function () {
        const resetToken = crypto.randomBytes(32).toString('hex')
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
        this.passwordResetExpired = Date.now() + 15 * 60 * 1000
        return resetToken
    }
}

//Export the model
module.exports = mongoose.model('User', userSchema);
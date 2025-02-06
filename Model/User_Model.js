import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import config from '../Configuration/Config.js'

const UserSchema = new mongoose.Schema({
    UserId: {
        type: Number,
        default: 0
    },
    UserName: {
        type: String,
        default: ''
    },
    Email: {
        type: String,
        default: ''
    },
    Password: {
        type: String,
        required: true
    },
    Role: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
})

UserSchema.methods.generatJWT = function (payload) {
    const token = jwt.sign(payload, config.secretOrKey)
    return `Bearer ${token}`
}

const UserModel = mongoose.model('User', UserSchema, 'User')

export default UserModel
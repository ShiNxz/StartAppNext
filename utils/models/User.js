import mongoose from 'mongoose'

Date.prototype.toUnixTime = function() { return this.getTime()/1000|0 };
Date.time = function() { return new Date().toUnixTime(); }

const UserSchema = new mongoose.Schema({
    userId: String,
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true
    },
    tokens: {
        confirm: { 
            type: String,
            required: true
        },
        change_password: { 
            type: String,
            required: false
        }
    },
    adverts: {
        type: Boolean,
        required: true
    },
    personal: {
        name: {
            type: String, 
        },
    },
    created_time: { type: Number, default: Date.time() },
}, {
    collection: 'Users'
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
import mongoose from 'mongoose'

Date.prototype.toUnixTime = function() {
    return this.getTime()/1000|0
}

Date.time = function() {
    return new Date().toUnixTime()
}

const ContactSchema = new mongoose.Schema({
	name: String,
	message: String,
	topic: String,
	ipAddress: String,
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
    },
	status: {
		type: Number,
		default: 0 // stats[0] - waiting
	},
    created_time: {
        type: Number,
        default: Date.time()
    },
    updatedAt: {
        type: Number,
        default: Date.time()
    }
}, {
    collection: 'ContactForms'
})

ContactSchema.pre('save', function(next) {
    this.updatedAt = Date.time()
    next()
})

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema)
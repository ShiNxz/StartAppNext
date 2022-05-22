import mongoose from 'mongoose'

Date.prototype.toUnixTime = function() {
    return this.getTime()/1000|0
}

Date.time = function() {
    return new Date().toUnixTime()
}

const NewsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
    },
	active: {
		type: Boolean,
		default: true,
	},
    createdTime: {
        type: Number,
        default: Date.time()
    }

}, {
    collection: 'Newsletter'
})

export default mongoose.models.Newsletter || mongoose.model('Newsletter', NewsletterSchema)
import mongoose from 'mongoose'

Date.prototype.toUnixTime = function () {
	return (this.getTime() / 1000) | 0
}

Date.time = function () {
	return new Date().toUnixTime()
}

const UserSchema = new mongoose.Schema(
	{
		userId: String,
		username: {
			type: String,
			unique: true,
			required: true,
			lowercase: true,
		},
		avatar: String,
		email: {
			type: String,
			unique: true,
			required: true,
			trim: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
		},
		tokens: {
			confirm: {
				type: String,
				required: true,
			},
			change_password: {
				type: String,
				required: false,
			},
		},
		adverts: {
			type: Boolean,
			required: true,
		},
		boards: [Object],
		page: {
			//required: false,
			name: String,
			title: String,
			banner: String,
			customLink: String,
			blocks: [mongoose.Mixed],
		},
		inquiries: [
			{
				name: String,
				message: String,
				email: {
					type: String,
					unique: true,
					required: true,
					trim: true,
					lowercase: true,
				},
				status: {
					type: Number,
					default: 0, // stats[0] - waiting
				},
				created_time: {
					type: Number,
					default: Date.time(),
				}
			},
		],
		created_time: {
			type: Number,
			default: Date.time(),
		},
		updatedAt: {
			type: Number,
			default: Date.time(),
		},
	},
	{
		collection: 'Users',
	}
)

UserSchema.pre('save', function (next) {
	this.updatedAt = Date.time()
	next()
})

export default mongoose.models.User || mongoose.model('User', UserSchema)

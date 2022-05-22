import jwt from 'jsonwebtoken'
import db from '@/utils/db'
import User from '@/models/User'

const middleware = (req, res) => {
	return new Promise(async (resolve, reject) => {
		if (!('token' in req.cookies)) return reject(res.status(200).json({ success: false, error: 'error to auth' }))

		let decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET)

		const user = await User.where('userId').equals(decoded.userId).limit(1)
		if (user.length < 1)
			return reject(res.status(200).json({ success: false, error: 'לא נמצא משתמש קיים עם הפרטים שנרשמו!' }))

		resolve(user[0])
	})
}

const handler = async (req, res) => {
	await db()
	const { method } = req

	switch (method) {
		case 'POST': {
			const user = await middleware(req, res)
			if (!user) return

			if (!req.body) return res.status(200).send({ success: false })

			console.log('NEW:', user.boards[req.body.index].notes)

			user.boards[req.body.index].notes = req.body.sort

			user.markModified('boards')

			await user.save()

			return res.status(200).json({ success: true, message: 'ההגדרות נשמרו!' })
		}
		default:
			return res.status(401).end()
	}
}

export default handler

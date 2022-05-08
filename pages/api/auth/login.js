import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import db from '@/utils/db'
import User from '@/models/User'

const handler = async (req, res) => {
	await db()

	const { method } = req

	switch (method) {
		case 'POST': {
			if (!req.body.identifier)
				return res.status(200).json({ success: false, error: 'שם המשתמש או כתובת האימייל חסרים' })
			if (!req.body.password) return res.status(200).json({ success: false, error: 'הסיסמה חסרה' })

			let { identifier, password } = req.body

			identifier = identifier.trim().toLowerCase()

			const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] })
			if (!user) return res.status(200).json({ success: false, error: 'לא נמצא משתמש קיים עם הפרטים שנרשמו!' })

			// TODO save user ip to db object lastLogin: { ip: 'x.x.x.x' }

			const hash = await bcrypt.compare(password, user.password)

			if (hash) {
				const token = jwt.sign(
					{
						userId: user.userId,
					},
					process.env.JWT_SECRET
				)

				return res.status(200).json({ success: true, token })
			} else {
				return res.status(200).json({ success: false, error: 'הסיסמה אינה תואמת לשם המשתמש / כתובת האימייל' })
			}
		}
		default:
			return res.status(401).end()
	}
}

export default handler

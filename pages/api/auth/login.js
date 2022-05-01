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
			if (!user) return res.status(200).json({ success: false, message: 'לא נמצא משתמש קיים עם הפרטים שנרשמו!' })

			const hash = await bcrypt.compare(password, user.password)

			user.page.blocks = [
				{
					type: 'aboutMe',
					variables: {
						text: 'לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח. עמחליף לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידום בעליק. קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידום בעליק. קונדימנטום קורוס בליקרה, נונסטי קלובר בריקנה סטום, לפריקך תצטריק לרטי.',
					}
				},
				{
					type: 'carousel',
					variables: {
						text: 'לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח. עמחליף לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידום בעליק. קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידום בעליק. קונדימנטום קורוס בליקרה, נונסטי קלובר בריקנה סטום, לפריקך תצטריק לרטי.',
					}
				},
				{
					type: 'custom',
					variables: {
						text: 'לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח. עמחליף לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידום בעליק. קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידום בעליק. קונדימנטום קורוס בליקרה, נונסטי קלובר בריקנה סטום, לפריקך תצטריק לרטי.',
					}
				},
			]
			await user.markModified('page')
			await user.save()

			if (hash) {
				const token = jwt.sign(
					{
						userId: user.userId,
					},
					process.env.JWT_SECRET
				)

				return res.status(200).json({ success: true, token })
			} else {
				return res.status(200).json({ success: false, message: 'הסיסמה אינה תואמת לשם המשתמש / כתובת האימייל' })
			}
		}
		default:
			return res.status(401).end()
	}
}

export default handler

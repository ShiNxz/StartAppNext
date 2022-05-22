import db from '@/utils/db'
import Newsletter from '@/models/Newsletter'

const handler = async (req, res) => {
	await db()

	const { method } = req

	switch (method) {
		case 'POST': {
			let { email } = req.body

			// TODO get the user ip and save it with the query

			await Newsletter.create({ email })

			return res.status(200).json({ success: true })
		}
		default:
			return res.status(401).end()
	}
}

export default handler

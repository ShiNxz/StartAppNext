import db from '@/utils/db'
import Newsletter from '@/models/Newsletter'
import ContactForm from '@/models/ContactForm'

const handler = async (req, res) => {
	await db()

	const { method } = req

	switch (method) {
		case 'POST': {
			let { email, name, message, topic, newsletter } = req.body

			// TODO get the user ip and save it with the query

			const form = await ContactForm.create({
				email, name, message, topic, ipAddress: '1.1.1.1'
			})

			if (newsletter && (await Newsletter.where('email').equals(email)).length < 1)
				await Newsletter.create({ email })

			const details = { email, name, message, topic, newsletter }

			return res.status(200).json({ success: true, details })
		}
		default:
			return res.status(401).end()
	}
}

export default handler

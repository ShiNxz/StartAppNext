import db from '@/utils/db'
import User from '@/models/User'

const handler = async (req, res) => {
	await db()
	const { method } = req
    
    switch(method) {
        case 'GET': {

    		let user = await User
                .find({$or: [{ username: req.query.user }, { "page.customLink": req.query.user }]})
                .select(['page', 'userId', 'avatar'])
                .limit(1)
    		if(user.length < 1) return res.status(200).json({ success: false, error: `Didn't find any user.` })
			return res.status(200).json({ userId: user[0].userId, avatar: user[0]?.avatar, ...user[0].page })

		}

		default: return res.status(401).end()
	}
}

export default handler
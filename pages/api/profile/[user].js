import db from '@/utils/db'
import User from '@/models/User'

const handler = async (req, res) => {
  await db()

  if (req.method === "GET") {
    let user = await User.where('username').equals(req.query.user).select(['page', 'userId']).limit(1)
    if(user.length < 1) return res.status(200).json({ error: `Didn't find any user.` })
    return res.status(200).json({ userId: user[0].userId, ...user[0].page })

  } else res.status(401).end()
}

export default handler
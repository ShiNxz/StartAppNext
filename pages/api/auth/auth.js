import jwt from "jsonwebtoken"

import db from '@/utils/db'
import User from '@/models/User'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    await db()

    if (!('token' in req.cookies))
      return res.status(200).json({ error: 'error to auth' })

    let decoded
    const token = req.cookies.token

    if (token) {
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
        let user = await User.findOne( { userId: decoded.userId } )
        
        user = {
          userId: user.userId,
          username: user.username,
          email: user.email,
          page: user.page,
          // ...
        }

        decoded = user
      } catch (e) {
        console.error(e)
      }
    }

    return decoded ? res.status(200).json(decoded) : res.status(200).json({ error: 'Unable to auth' })
  }
}

export default handler
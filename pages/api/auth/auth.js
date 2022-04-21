import jwt from "jsonwebtoken"

import db from '@/utils/db'
import User from '@/models/User'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    await db()

    if (!('token' in req.cookies))
      return res.status(401).json({message: 'Unable to auth'})

    let decoded
    const token = req.cookies.token

    if (token) {
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne( { userId: decoded.userId } )
        // pull data from db and send it minimized to the user
        decoded = user
      } catch (e) {
        console.error(e)
      }
    }

    return decoded ? res.status(200).json(decoded) : res.status(401).json({message: 'Unable to auth'})
  }
}

export default handler
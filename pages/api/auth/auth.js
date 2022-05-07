import jwt from "jsonwebtoken"

import db from '@/utils/db'
import User from '@/models/User'

const handler = async (req, res) => {
  await db()
  const { method } = req
    
  switch(method) {
    case 'GET': {
      if (!('token' in req.cookies))
        return res.status(200).json({ success: false, error: 'error to auth' })

      let decoded

      if (req.cookies.token) {
        try {
          decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
          let user = await User.findOne( { userId: decoded.userId } )

          user = {
            userId: user.userId,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            page: user.page,
            boards: user.boards,
            // ...
          }
        
          decoded = user
        } catch (e) {
          console.error(e)
        }
      }
      
      return decoded ? res.status(200).json(decoded) : res.status(200).json({ success: false, error: 'Unable to auth' })
    }

    default: return res.status(401).end()
  }
}

export default handler
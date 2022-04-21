import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import db from '@/utils/db'
import User from '@/models/User'

const handler = async (req, res) => {
  await db()

  if (req.method === "POST") {
    // login
    if(req.body.identifier == null) return res.status(403).send({message: 'Username / Email is missing'})
    if(req.body.password == null) return res.status(403).send({message: 'Password is missing'})

    let { identifier, password } = req.body

    identifier = identifier.trim().toLowerCase()

    const user = await User.findOne( { $or: [{email: identifier}, {username: identifier}] } )

    if(!user) return res.status(500).json({ error: true, message: "Error finding User" })

    const hash = await bcrypt.compare(password, user.password)

    const userr = await User.where("username").equals("test1").limit(1)
    userr[0].page = { name: 'אמיר 2' }
    await userr[0].save()    

    if (hash) {
      const token = jwt.sign({
        userId: user.userId
      }, process.env.JWT_SECRET)
      return res.status(200).json({ token })
    } else {
      return res.status(401).json({ error: true, message: "Auth Failed" })
    }

  } else res.status(401).end()
}

export default handler
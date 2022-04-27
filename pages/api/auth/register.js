import { isEmail, isStrongPassword } from 'validator'

import bcrypt from "bcrypt"
import { v4 } from "uuid"
import jwt from "jsonwebtoken"

import db from '@/utils/db'
import User from '@/models/User'

const handler = async (req, res) => {
  await db()

  if (req.method === 'POST') {
    if(!req.body.username) return res.status(200).send({ error: true, message: 'שם המשתמש חסר' })
    if(!req.body.email) return res.status(200).send({ error: true, message: 'כתובת אימייל חסרה' })
    if(!req.body.password) return res.status(200).send({ error: true, message: 'הסיסמה חסרה' })

    let { username, email, password, adverts } = req.body

    username = username.trim().toLowerCase()
    email = email.trim().toLowerCase()

    if(!isEmail(email)) return res.status(200).json({ error: true, message: 'כתובת האימייל שגויה' })
    if(!isStrongPassword(password, { minLength: 6, maxLength: 24, minLowercase: 1, minUppercase: 0, minNumbers: 1, minSymbols: 0 })) return res.status(200).json({ error: true, message: 'הסיסמה אינה תקינה' })

    // verify email does not exist already
    if((await User.find( { $or: [{email}, {username}] } )).length > 0) return res.status(200).json({ error: true, message: 'שם המשתמש או כתובת האימייל כבר קיימים במערכת!' })

    const hash = await bcrypt.hash(password, 10)

    const createdUser = await User.create({
      userId: v4(),
      username,
      email,
      password: hash,
      tokens: { confirm: v4() },
      adverts // check if it works!
    })

    const token = jwt.sign({
      userId: createdUser.userId,
      email: createdUser.email
    }, process.env.JWT_SECRET)

    return res.status(200).json({ token })
  } else res.status(401).end()
}

export default handler
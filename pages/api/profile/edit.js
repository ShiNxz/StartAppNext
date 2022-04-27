import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import db from '@/utils/db'
import User from '@/models/User'

const handler = async (req, res) => {
	await db()

    if (!('token' in req.cookies))
        return res.status(200).json({ error: 'error to auth' })

    

	if (req.method === "POST") {
		if(!req.body.options) return res.status(403).send({message: 'הסיסמה חסרה'})

        let decoded
        const token = req.cookies.token

        if (token) {
            try {
                decoded = jwt.verify(token, process.env.JWT_SECRET)
		        let { options } = req.body
                

	  	        const user = await User.where("userId").equals(decoded.userId).limit(1)
                if(!user) return res.status(200).json({ error: true, message: "לא נמצא משתמש קיים עם הפרטים שנרשמו!" })

                user[0].page[Object.entries(options)[0][0]] = Object.entries(options)[0][1]
                user[0].markModified('page')

	  	        await user[0].save()
                
	  	        return res.status(200).json({ success: true, data: user[0] })

            } catch (e) {
                console.log(e)
            }
        }

	} else res.status(401).end()
}

export default handler
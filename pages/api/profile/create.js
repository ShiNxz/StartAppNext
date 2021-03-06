import jwt from "jsonwebtoken"
import db from '@/utils/db'
import User from '@/models/User'

const middleware = (req, res) => {
    return new Promise(async (resolve, reject) => {
        if (!('token' in req.cookies))
            return reject(
                res.status(200).json({ success: false, error: 'error to auth' })
            )

        let decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET)

        const user = await User.where("userId").equals(decoded.userId).limit(1)
        if(user.length < 1) return reject(
            res.status(200).json({ success: false, error: "לא נמצא משתמש קיים עם הפרטים שנרשמו!" })
        )

        resolve(user[0])
    })
}

const handler = async (req, res) => {
	await db()

    const { method } = req
    
    switch(method) {
        case 'POST': {

            const user = await middleware(req, res)
            if(!user) return;

		    if(!req.body) return res.status(200).send({ error: 'missing information'})

            const page = {
                blocks: [
                    {
						key: 'aboutMe-1',
                        type: 'aboutMe',
                        variables: {
							text: 'טקסט לדוגמה...'
						}
                    }
					
                ]
            }

            req.body.map(v => {
                const [key, value] = Object.entries(v)[0]
                page[key] = value
            })

            user.page = page

            user.markModified('page')

	  	    await user.save()

	  	    return res.status(200).json({ success: true, data: user })
        }

        default: return res.status(401).end()
	}
}

export default handler
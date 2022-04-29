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
            console.log(req.body.options)
            
		    if(!req.body.options) return res.status(200).send({ success: false })

            let exist = await User.where(`page.${Object.entries(req.body.options)[0][0]}`).equals(Object.entries(req.body.options)[0][1])
            if(Object.entries(req.body.options)[0][0] === 'customLink' && exist.length > 0) return res.status(200).json({ success: false, message: '✘ קיים משתמש בעל פרטים זהים!' })
            user.page[Object.entries(req.body.options)[0][0]] = Object.entries(req.body.options)[0][1]
            user.markModified('page')
            
            await user.save()
            
            return res.status(200).json({ success: true, message: '✓ ההגדרות נשמרו!' })

        }
        default: return res.status(401).end()
    }
}

export default handler
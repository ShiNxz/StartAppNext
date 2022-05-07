import formidable from 'formidable-serverless'
import jwt from "jsonwebtoken"
import db from '@/utils/db'
import User from '@/models/User'

export const config = {
    api: {
        externalResolver: true,
        bodyParser: false,
    },
}

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

		    const form = new formidable.IncomingForm({
                maxFileSize: 20 * 1024 * 1024,
                keepExtensions: true,
                uploadDir: "./public/uploads"
            })

            form.parse(req, async (err, fields, files) => {
                if(Object.entries(files).length < 1) return;

                const [key, value] = Object.entries(files)[0]
                
                user.page.banner = value.path.replace(`public\\uploads\\`, '')

                user.markModified('page')
        
                await user.save()

                return res.status(200).json({ success: true })

            })

            form.onPart = (part) => {
                if(part.mime === 'image/png' || part.mime === 'image/jpeg' || part.mime === 'image/gif') {
                    form.handlePart(part)
                } else
                    return res.status(200).json({ success: false, error: 'ניתן לבחור אך ורק תמונות!' })
            }

            form.on('error', (err) => {
                return res.status(200).json({ success: false, error: err })
            })


        }

        //default: return res.status(401).end()
    }
}

export default handler
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import db from '@/utils/db'
import User from '@/models/User'

const handler = async (req, res) => {
	await db()

	if (req.method === "POST") {
		// login
		if(req.body.identifier == null) return res.status(403).send({message: 'שם המשתמש או כתובת האימייל חסרים'})
		if(req.body.password == null) return res.status(403).send({message: 'הסיסמה חסרה'})

		let { identifier, password } = req.body

		identifier = identifier.trim().toLowerCase()

		const user = await User.findOne( { $or: [{email: identifier}, {username: identifier}] } )

		if(!user) return res.status(200).json({ error: true, message: "לא נמצא משתמש קיים עם הפרטים שנרשמו!" })

	  	const hash = await bcrypt.compare(password, user.password)

	  	const userr = await User.where("username").equals("test1").limit(1)
	  	userr[0].page = {
	    	name: 'אמיר אליז',
	    	avatar: 'https://pickaface.net/gallery/avatar/demo.webmaster541295de29059.png',
	    	title: 'מתכנת Full-Stack',
	    	banner: 'https://s3.amazonaws.com/thumbnails.venngage.com/template/10d4dd8e-178e-44c0-b848-e7189399231a.png',
	    	blocks: [
	    	  {
	    	    type: 0,
	    	    title: 'אודות',
	    	    text: "לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח. עמחליף לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידום בעליק. קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידום בעליק. קונדימנטום קורוס בליקרה, נונסטי קלובר בריקנה סטום, לפריקך תצטריק לרטי."
	    	  },
	    	  {
	    	    type: 0,
	    	    title: 'מידע',
	    	    text: "לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח. עמחליף לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידום בעליק. קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידום בעליק. קונדימנטום קורוס בליקרה, נונסטי קלובר בריקנה סטום, לפריקך תצטריק לרטי."
	    	  },
	    	  {
	    	    type: 1,
	    	    title: 'גלריית תמונות',
	    	  },
	    	]

	  	}
	  	await userr[0].save()    

	  	if (hash) {
	    	const token = jwt.sign({
	    		userId: user.userId
	    	}, process.env.JWT_SECRET)
	    	return res.status(200).json({ token })
	  	} else {
	    	return res.status(200).json({ error: true, message: "הסיסמה אינה תואמת לשם המשתמש / כתובת האימייל" })
	  	}

	} else res.status(401).end()
}

export default handler
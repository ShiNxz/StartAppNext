import BlockTypes from '@/utils/page/Blocks'
import jwt from 'jsonwebtoken'
import db from '@/utils/db'
import User from '@/models/User'

const middleware = (req, res) => {
	return new Promise(async (resolve, reject) => {
		if (!('token' in req.cookies)) return reject(res.status(200).json({ success: false, error: 'error to auth' }))

		let decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET)

		const user = await User.where('userId').equals(decoded.userId).limit(1)
		if (user.length < 1)
			return reject(res.status(200).json({ success: false, error: 'לא נמצא משתמש קיים עם הפרטים שנרשמו!' }))

		resolve(user[0])
	})
}

const handler = async (req, res) => {
	await db()
	const { method } = req

	switch (method) {
		case 'POST': {
			const user = await middleware(req, res)
			if (!user) return

			if (!req.body.options) return res.status(200).send({ success: false })

			const variable = Object.entries(req.body.options)[0][0]
			const value = Object.entries(req.body.options)[0][1]

			switch (variable) {
				case 'name': {
					user.page.name = value
					break
				}

				case 'title': {
					user.page.title = value
					break
				}

				case 'customLink': {
					let exist = await User.where(`page.${variable}`).equals(value)
					if (exist.length > 0)
						return res.status(200).json({ success: false, message: '✘ קיים משתמש בעל פרטים זהים!' })

					user.page.customLink = value
					break
				}

				case 'blocksOrder': {
					user.page.blocks = value
					break
				}

				case 'deleteBlock': {
					user.page.blocks = user.page.blocks.filter((block) => block.key !== value)
					user.markModified('page')
					await user.save()
					return res
						.status(200)
						.json({ success: true, message: user.page.blocks.filter((block) => block.key !== value) })
					break
				}

				case 'addBlock': {
					const type = BlockTypes.filter((block) => block.id === value)[0]

					let variables = {}
					type.variables.forEach((v) => (variables = { ...variables, [v.identifier]: v.defaultValue }))

					user.page.blocks.push({
						key: `${type.id}-${Math.floor(1000 + Math.random() * 9000)}`,
						type: type.id,
						variables
					})

					user.markModified('page')
					await user.save()
					return res.status(200).json({ success: true, message: user.page.blocks })
					break
				}

				case variable.startsWith('blocks.') ? variable : '': {
					const splited = variable.split('.')
					const splitedType = splited[1].split('-')
					const filteredType = BlockTypes.filter((b) => b.id === splitedType[0])[0]
					const filteredVariable = filteredType.variables.filter((v) => v.identifier === splited[2])[0]
					//console.log(filteredVariable)
					// ! make checks for min and max lengths + validation again + for every other input
					const index = user.page.blocks.findIndex((obj) => obj.key === splited[1])
					console.log(user.page.blocks[index].variables[splited[2]])
					user.page.blocks[index].variables[splited[2]] = value
					console.log(index)
					break
				}
			}

			user.markModified('page')

			await user.save()

			return res.status(200).json({ success: true, message: 'ההגדרות נשמרו!' })
		}
		default:
			return res.status(401).end()
	}
}

export default handler

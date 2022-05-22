import { Collapse, Text } from '@nextui-org/react'

const items = [
	{
		title: 'test',
		text: 'test',
	},
]

const Item = ({ title, text, index }) => {
	return (
		<Collapse
			title={title}
			expanded={index == 1}
			shadow={false}
			id="1"
		>
			<Text>{text}</Text>
		</Collapse>
	)
}

const FAQ = () => {
	return (
		<div className='relative text-center py-8'>
			<span className='font-medium text-2xl'>שאלות נפוצות</span>

			<div className='container z-20 py-6 relative text-right'>
				<Collapse.Group splitted>
					{items.map((i, index) => (
						<Item
							title={i.title}
							text={i.text}
							index={index}
							key={i.title}
						/>
					))}
				</Collapse.Group>
			</div>
		</div>
	)
}

export default FAQ

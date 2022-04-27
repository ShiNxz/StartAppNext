import BlockTypes from "@/data/BlockTypes"

// BlockTypes[info.type].name 
const Block = ({ info }) => {
	return <div id={info.title} className="mx-auto z-20 bg-white rounded-3xl shadow-low p-6 pb-10 px-12 mb-8 w-full">
		<h5 className="block_title block text-4xl font-semibold text-gray-800"> { info.title } </h5>
		<p className="text-gray-600"> { info.text } </p>
	</div>
}

export default Block
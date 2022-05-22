import Button from '@/Next/Button'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import phone from '@/public/assets/phone.webp'
import block1bg from '@/public/assets/bg_banner.png'
import Image from 'next/image'

const Main = () => {
	return (
		<div className='flex flex-row h-[650px] container '>
			<div className='w-full absolute inset-0 h-[650px] z-0 '>
				<Image
					src={block1bg}
					alt='bg'
					quality={100}
					layout='fill'
					className='bg-contain bg-center'
				/>
			</div>
			<div className='z-10 w-1/2 flex flex-col justify-center text-black'>
				<span className='text-5xl font-semibold'>לורם איפסום דולור סיט</span>
				<span className='text-lg mt-2'>
					לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית לפרומי בלוף קינץ תתיח לרעח. לת צשחמי צש בליא,
					מנסוטו צמלח לביקו ננבי, צמוקו בלוקריה שיצמה ברורק. ושבעגט ליבם סולגק. בראיט ולחת צורק מונחף, בגורמי
					מגמש. תרבנך וסתעד לכנו סתשם השמה - לתכי מורגם בורק? לתיג ישבעס.
				</span>
				<div className='mt-12'>
					<Button>
						צור דף עסקי <KeyboardBackspaceIcon className='mr-3' />
					</Button>
				</div>
			</div>
			<div className='w-1/2'>
				<Image
					src={phone}
					alt='mockup'
					height={570}
					width={570}
					quality={100}
					layout='fixed'
					className='duration-300 hover:-translate-y-1 scale-x-[-1]'
				/>
			</div>
		</div>
	)
}

export default Main
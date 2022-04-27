// Imports
import useUser from '@/data/useUser'
import { ProfileContext } from '@/pages/[user]'
import { useContext } from 'react'
import SettingsInput from './Settings/Input'

const Title = ({ title, des }) => (
    <>
        <h5 className='settings_title mb-0'> { title } </h5>
        { des && <p className='text-center mb-6 text-sm'> { des } </p> }
    </>
)

const MainInformation = () => {
    const { loggedIn, user } = useUser()
    const { data } = useContext(ProfileContext)

    const settings = [
        {
            name: 'name',
            title: 'שם פרטי',
            initValue: data.name,
            helper: 'השם שיוצג בפרופיל',
            validate: (input) => {
                if(input === '') return 'יש להקליד שם'
                if(input === '123') return '123error'
                return true
            }
        },
        {
            name: 'title',
            title: 'תפקיד',
            initValue: data.title,
            helper: 'כותרת',
            validate: (input) => {
                if(input === '') return 'יש להקליד שם'
                if(input === '123') return '123error'
                return true
            }
        },
        
    ]

    return  (
        <>
            <Title title='הגדרות כלליות' des='פרטי זיהוי' />
            {
                data && loggedIn && user.userId === data.userId ? <>
                    {
                        settings.map(s => 
                            <SettingsInput
                                key={s.name}
                                name={s.name}
                                title={s.title}
                                initValue={s.initValue}
                                helper={s.helper}
                                validate={s.validate}
                                className='!mb-12'
                            />
                        )
                    }
                </> : <>Loading...</>
            }
            <Title title='פרטי קשר' />
            <Title title='רשתות חברתיות' />
            

        </>
    )
}

const BannerSettings = () => {
    const { loggedIn, user } = useUser()
    const { data } = useContext(ProfileContext)

    const settings = [
        {
            name: 'name',
            title: 'שם פרטי',
            initValue: data.name,
            helper: 'השם שיוצג בפרופיל',
            validate: (input) => {
                if(input === '') return 'יש להקליד שם'
                if(input === '123') return '123error'
                return true
            }
        },
        {
            name: 'title',
            title: 'תפקיד',
            initValue: data.title,
            helper: 'כותרת',
            validate: (input) => {
                if(input === '') return 'יש להקליד שם'
                if(input === '123') return '123error'
                return true
            }
        },
        
    ]

    return  (
        <>
            <h1 className='settings_title'>באנר</h1>
            
        </>
    )
}

const Tabs = [
    {
        name: 'הגדרות כלליות',
        component: <MainInformation />
    },
    {
        name: 'באנר',
        component: <BannerSettings />
    },
]

export default Tabs
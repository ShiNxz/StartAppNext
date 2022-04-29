import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'

const Items = [
    {
        name: 'עמוד ראשי',
        link: '/dashboard',
        icon: <AddPhotoAlternateIcon sx={{fontSize: 50}} />
    },
    {
        name: 'טסט',
        link: '/dashboard/test',
        icon: <AddPhotoAlternateIcon sx={{fontSize: 50}} />
    },
    {
        name: 'הגדרות משתמש',
        link: '/dashboard/settings',
        icon: <ManageAccountsIcon sx={{fontSize: 50}} />
    }
]

export default Items
import Collapse from '@mui/material/Collapse'
import { TransitionGroup } from 'react-transition-group'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'

const Progress = ({ alert, loading }) => {
	return (
		<TransitionGroup>
			<Collapse
				in={alert.show || loading}
				sx={{ width: '100%', margin: 'auto', my: '20px' }}
			>
				{loading ? (
					<Box sx={{ width: '100%', margin: 'auto', my: '10px' }}>
						<LinearProgress />
					</Box>
				) : (
					alert.show && (
						<Alert
							severity={alert.style}
							sx={{ mb: 2 }}
						>
							{alert.message}
						</Alert>
					)
				)}
			</Collapse>
		</TransitionGroup>
	)
}

export default Progress

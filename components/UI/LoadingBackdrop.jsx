import CircularProgress from '@mui/material/CircularProgress'

const LoadingBackdorp = ({ loading }) => {
  return loading ? (
    <div className='bg-slate-100 fixed inset-0 duration-300 flex justify-center items-center z-[5000]'>
      <CircularProgress className='z-[50000]' />
    </div>
  ) : null
}

export default LoadingBackdorp
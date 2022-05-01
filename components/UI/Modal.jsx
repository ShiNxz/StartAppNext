import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'

const Modal = ({ title, children, footer, open, setOpen, maxWidth, fullWidth }) => {
    return (
        <Dialog
            open={open}
            keepMounted
            onClose={() => setOpen(false)}
            aria-describedby="alert-dialog-slide-description"
			maxWidth={maxWidth}
			fullWidth={true}
        >
            <div className="flex flex-col min-w-[30rem] max-w-5xl px-4 py-8 bg-white rounded-lg shadow sm:px-6 md:px-8 lg:px-5">
                { title ?
                <>
                    <div className="self-center mb-2 pb-2 text-xl font-semibold text-gray-800">{ title }</div>
                    <Divider />
                </> : '' }

                <div className="p-6">{ children }</div>
        
                { footer ?
                <>
                    <Divider />
                    <span className="justify-center text-sm text-center text-gray-500 flex-items-center pt-6">
                        { footer }
                    </span>
                </> : '' }
            </div>
        </Dialog>
    )

}

export default Modal
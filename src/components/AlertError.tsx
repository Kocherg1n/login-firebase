import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'
import React, {ReactNode} from 'react'
import Snackbar from '@material-ui/core/Snackbar'

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

interface AlertErrorProps {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
}

export const AlertError: React.FC<AlertErrorProps> = ({isOpen, onClose, children}) => {


    return (
        <Snackbar open={isOpen} autoHideDuration={5000} onClose={onClose}>
            <Alert onClose={onClose} severity="error">
                {children}
            </Alert>
        </Snackbar>
    )
}


import React, {ReactElement, useEffect} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {Link, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import {
    errorMessSelector,
    hasErrorSelector,
    login,
    register,
    UserData,
    clearErrorMessage,
    isLoadingSelector
} from '../features/authSlice'

import {Theme, Button, Box} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import {AlertError} from '../components/AlertError'

const useStyles = makeStyles((theme: Theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '400px',
        '& .MuiTextField-root': {
            marginBottom: theme.spacing(3),
        },
        '& .MuiButtonBase-root': {
            padding: '16px 16px',
            marginBottom: theme.spacing(1),
        },
        '& .MuiBox-root': {
            display: 'flex',
            alignItems: 'baseline',
            '& .MuiTypography-root': {
                marginRight: theme.spacing(1)
            }
        },
        '& h4': {
            marginBottom: theme.spacing(3)
        }
    }
}))

interface Inputs {
    email: string
    password: string
}

export const Auth: React.FC = (): ReactElement => {
    const classes = useStyles()
    const {pathname} = useLocation()
    const isLoginPage = (pathname === '/login')
    const isRegisterPage = (pathname === '/register')
    const {handleSubmit, errors: fieldsErrors, control} = useForm<Inputs>()
    const dispatch = useDispatch()
    const hasError = useSelector(hasErrorSelector)
    const errorMess = useSelector(errorMessSelector)
    const isLoading = useSelector(isLoadingSelector)
    const [errorShow, setErrorShow] = React.useState<boolean>(false)



    useEffect(() => {
        if (hasError) {
            setErrorShow(true)
        }
    }, [hasError])

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorShow(false);
    }

    const onSubmit = (data: UserData): void => {
        dispatch(clearErrorMessage())
        const {email, password} = data
        if (isLoginPage) {
            dispatch(login(email, password))
        }
        if (isRegisterPage) {
            dispatch(register(email, password))
        }
    }

    return (<>
            <AlertError onClose={handleClose} isOpen={errorShow}>
                {errorMess}
            </AlertError>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                {isLoginPage
                    ? <Typography variant="h4" gutterBottom>Login</Typography>
                    : <Typography variant="h4" gutterBottom>Registration</Typography>}
                <Controller
                    name="email"
                    as={
                        <TextField
                            id="email"
                            helperText={fieldsErrors.email ? fieldsErrors.email.message : null}
                            variant="outlined"
                            label="Email"
                            error={Boolean(fieldsErrors.email)}
                        />
                    }
                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'Field is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: 'Invalid email address'
                        }
                    }}
                />
                <Controller
                    name="password"
                    as={
                        <TextField
                            id="password"
                            type="password"
                            helperText={fieldsErrors.password ? fieldsErrors.password.message : null}
                            variant="outlined"
                            label="Password"
                            error={Boolean(fieldsErrors.password)}
                        />
                    }
                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'Field is required',
                        minLength: {
                            value: 6,
                            message: 'Password must have at least 6 characters'
                        }
                    }}
                />
                {isLoginPage
                    ? (<>
                        <Button type='submit' variant="contained" color="primary" disabled={isLoading}>Login</Button>
                        < Box>
                            < Typography variant='caption' display='block' gutterBottom>Don't have account?</Typography>
                            <Link to='/register'>Register</Link>
                        </Box>
                    </>)
                    : (<>
                        <Button type='submit' variant="contained" color="primary" disabled={isLoading}>Register</Button>
                        < Box>
                            < Typography variant='caption' display='block' gutterBottom>Alredy have an
                                account?</Typography>
                            <Link to='/login'>Login</Link>
                        </Box>
                    </>)}
            </form>
        </>
    )
}

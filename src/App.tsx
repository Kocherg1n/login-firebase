import React, {ReactElement, useEffect} from 'react'
import {Route, Switch, useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {loggedInSelector} from './features/authSlice'
import {Auth} from './pages/Auth'
import {Home} from './pages/Home'
import Box from '@material-ui/core/Box'
import makeStyles from '@material-ui/styles/makeStyles'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    }
}))

export const App: React.FC = (): ReactElement => {
    const classes = useStyles()
    const isLoggedIn = useSelector(loggedInSelector)
    const history = useHistory()

    useEffect(() => {
        if (!isLoggedIn) {
            history.push('/login')
        }
    }, [isLoggedIn, history])

    if (isLoggedIn) {
        return <Home/>
    }

    return (
        <Box className={classes.root}>
            <Switch>
                <Route path='/login' component={Auth}/>
                <Route path='/register' component={Auth}/>
            </Switch>
        </Box>
    )
}

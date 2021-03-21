import React from 'react'
import ReactDOM from 'react-dom'
import {App} from './App'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import {CssBaseline} from '@material-ui/core'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from './store'

import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/database'

firebase.initializeApp({
    apiKey: "AIzaSyC7AUepu_hgizNSyQDMZ9Fgs7i8Ngw7qvE",
    authDomain: "login-fcaff.firebaseapp.com",
    projectId: "login-fcaff",
    storageBucket: "login-fcaff.appspot.com",
    messagingSenderId: "189967538360",
    appId: "1:189967538360:web:2b9d211bd9f0d527797c4d"
})

const theme = createMuiTheme({
    overrides: {
        MuiCssBaseline: {
            '@global': {
                html: {
                    WebkitFontSmoothing: 'auto',
                },
            },
        },
    },
})

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <App/>
            </ThemeProvider>
        </Router>
    </Provider>,
    document.getElementById('root')
)

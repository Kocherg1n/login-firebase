import {createSlice} from '@reduxjs/toolkit'
import {RootState, ThunkType} from '../store'
import firebase from 'firebase'

export interface UserData {
    email: string
    password: string
}

interface InitialState {
    isLoggedIn: boolean
    hasError: boolean
    errorMessage: string | null
    isLoading: boolean
}

const initialState: InitialState = {
    isLoggedIn: false,
    hasError: false,
    isLoading: false,
    errorMessage: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        getAuthData(state) {
            state.isLoading = true
        },
        getAuthDataSuccess(state) {
            state.isLoading = false
            state.isLoggedIn = true
        },
        getAuthDataFailure(state) {
            state.isLoading = false
            state.hasError = true
        },
        setLogOut(state) {
            state.isLoading = false
            state.isLoggedIn = false
        },
        setErrorMessage(state, {payload}) {
            state.errorMessage = payload
        },
        clearErrorMessage(state) {
            state.errorMessage = null
            state.hasError = false
        }
    }
})


export const login = (email: string, password: string): ThunkType => async dispatch => {
    dispatch(getAuthData())
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        dispatch(getAuthDataSuccess())
    } catch (e) {
        dispatch(setErrorMessage(e.message))
        dispatch(getAuthDataFailure())
    }
}

export const register = (email: string, password: string): ThunkType => async dispatch => {
    dispatch(getAuthData())
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        dispatch(getAuthDataSuccess())
    } catch (e) {
        dispatch(setErrorMessage(e.message))
        dispatch(getAuthDataFailure())
    }
}

export const logOut = (): ThunkType => async dispatch => {
    dispatch(getAuthData())
    try {
        await firebase.auth().signOut()
        dispatch(setLogOut())
    } catch (e) {
        dispatch(getAuthDataFailure())
    }
}


export const loggedInSelector = (state: RootState) => state.auth.isLoggedIn
export const hasErrorSelector = (state: RootState) => state.auth.hasError
export const errorMessSelector = (state: RootState) => state.auth.errorMessage
export const isLoadingSelector = (state: RootState) => state.auth.isLoading

export const {
    getAuthDataFailure,
    getAuthDataSuccess,
    getAuthData,
    setLogOut,
    clearErrorMessage,
    setErrorMessage
} = authSlice.actions

export default authSlice.reducer

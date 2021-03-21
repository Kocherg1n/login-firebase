import {Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import projects from './features/projectsSlice'
import auth from './features/authSlice'

export const store = configureStore({
    reducer: {
        projects,
        auth
    }
})

export type RootState = ReturnType<typeof store.getState>
export type ThunkType = ThunkAction<void, RootState, unknown, Action<string>>

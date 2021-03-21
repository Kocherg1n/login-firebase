import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState, ThunkType} from '../store'
import {formatData} from '../helpers'
import {api} from '../api'

export interface Project {
    id?: string
    projectTitle: string
    dateStart: string
    dateEnd:  string
    projectManager: string
    projectAdmin: string
}

interface InitialState {
    items: Project[]
    hasError: boolean
    isLoading: boolean
    errorMessage: null | string
}

const initialState: InitialState = {
    items: [],
    hasError: false,
    isLoading: false,
    errorMessage: null,
}

export const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        getProjects(state) {
            state.isLoading = true
        },
        getProjectsSuccess(state, {payload}: PayloadAction<Project[]>) {
            state.isLoading = false
            state.items = payload
        },
        getProjectsFailure(state) {
            state.isLoading = false
            state.hasError = true
        }
    }
})


export const addNewProject = (data: Project): ThunkType => async dispatch => {
    try {
        await api.addProject(data)
        dispatch(fetchProjects())
    } catch (e) {
        dispatch(getProjectsFailure())
    }
}

export const fetchProjects = (): ThunkType => async dispatch => {
    try {
        dispatch(getProjects())
        const {data} = await api.getProjects()
        const formattedItems = formatData(data)
        dispatch(getProjectsSuccess(formattedItems))
    } catch (e) {
        dispatch(getProjectsFailure())
    }
}

export const projectsSelector = (state: RootState) => state.projects.items
export const isLoadingSelector = (state: RootState) => state.auth.isLoading
export const {getProjects, getProjectsSuccess, getProjectsFailure} = projectSlice.actions
export default projectSlice.reducer

import {Project} from './features/projectsSlice'
import axios from 'axios'

const _baseUrl = 'https://login-fcaff-default-rtdb.firebaseio.com/projects.json'

export const api = {
    addProject(data: Project) {
        return axios.post(_baseUrl, {...data})
    },
    getProjects() {
        return axios.get(_baseUrl).then(res => res)
    }
}

import axios from 'axios'

export const TIMEOUT_IN_MS = 30000

const URL = import.meta.env.VITE_API_URL

export const DEFAULT_HEADERS = {
    Accept: 'application/json',
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
}

export const apiWithConfig = axios.create({
    baseURL: URL,
    timeout: TIMEOUT_IN_MS,
    headers: DEFAULT_HEADERS
})

apiWithConfig.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('token')
    if (token && config.headers) config.headers.Authorization = token
    return config
})

apiWithConfig.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status
        if (status === 403) {
            localStorage.removeItem('token')
        }
        return Promise.reject(error)
    },
)
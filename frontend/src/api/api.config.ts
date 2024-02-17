import axios from 'axios'
import * as https from 'https'

export const API_URL = process.env.API_URL
export const TIMEOUT_IN_MS = 30000

const agent = new https.Agent({})

export const DEFAULT_HEADERS = {
    Accept: 'application/json',
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
}

export const apiWithConfig = axios.create({
    baseURL: API_URL,
    timeout: TIMEOUT_IN_MS,
    headers: DEFAULT_HEADERS,
    httpsAgent: agent,
})

apiWithConfig.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('token')
    if (token && config.headers) config.headers.Authorization = JSON.parse(token)
    return config
})

apiWithConfig.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error)
    },
)
import {apiWithConfig} from "./api.config.ts";
import {ApiResponseType} from "../types/ApiResponse.ts";


export const api = {
    logIn: (username: string, password: string): ApiResponseType<string> => {
        return apiWithConfig.post('/auth/authenticate', { username, password })
    },
}
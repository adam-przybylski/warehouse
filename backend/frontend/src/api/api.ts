import {apiWithConfig} from "./api.config.ts";
import {ApiResponseType} from "../types/ApiResponseType.ts";
import {AccountType} from "../types/AccountType.ts";


export const api = {
    logIn: (username: string, password: string): ApiResponseType<string> => {
        return apiWithConfig.post('/auth/authenticate', { username, password })
    },
    getCurrentAccount: (username: string | undefined): ApiResponseType<AccountType> => {
        return apiWithConfig.get(`/api/v1/accounts/${username}`)
    },
}
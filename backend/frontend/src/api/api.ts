import {apiWithConfig} from "./api.config.ts";
import {ApiResponseType} from "../types/ApiResponseType.ts";
import {AccountType} from "../types/AccountType.ts";


export const api = {
    logIn: (username: string, password: string): ApiResponseType<string> => {
        return apiWithConfig.post('/auth/authenticate', { username, password })
    },
    getAccount: (username: string | undefined): ApiResponseType<AccountType> => {
        return apiWithConfig.get(`/accounts/${username}`)
    },
    getAccounts: (): ApiResponseType<AccountType[]> => {
        return apiWithConfig.get(`/accounts`)
    },
    enableAccount: (username: string): ApiResponseType<AccountType> => {
        return apiWithConfig.patch(`/accounts/enable/${username}`)
    },
    disableAccount: (username: string): ApiResponseType<AccountType> => {
        return apiWithConfig.patch(`/accounts/disable/${username}`)
    },
    updatePassword: (username: string | undefined, password: string | undefined): ApiResponseType<AccountType> => {
        return apiWithConfig.put(`/accounts/${username}`, { username, password })
    },
    addAccount: (account: AccountType): ApiResponseType<AccountType> => {
        return apiWithConfig.post(`/accounts`, {...account})
    },
}
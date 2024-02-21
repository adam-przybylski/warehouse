import {apiWithConfig} from "./api.config.ts";
import {ApiResponseType} from "../types/ApiResponseType.ts";
import {AccountType} from "../types/AccountType.ts";
import {ClientType} from "../types/ClientType.ts";
import {ProductType} from "../types/ProductType.ts";


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

    getClients:(): ApiResponseType<ClientType[]> => {
        return apiWithConfig.get(`/clients`)
    },
    getClient: (username: string): ApiResponseType<ClientType> => {
        return apiWithConfig.get(`/clients/${username}`)
    },
    addClient: (client: ClientType): ApiResponseType<ClientType> => {
        return apiWithConfig.post(`/clients`, {...client})
    },
    deleteClient: (username: string): ApiResponseType<ClientType> => {
        return apiWithConfig.delete(`/clients/${username}`)
    },

    getProducts: (): ApiResponseType<ProductType[]> => {
        return apiWithConfig.get(`/products`)
    },
    updateNumberOfProductItems: (product: ProductType):  ApiResponseType<ProductType> => {
        return apiWithConfig.put(`/products/${product.name}`, {...product})
    },
    updateProducts: (products: ProductType[]):  ApiResponseType<ProductType[]> => {
        return apiWithConfig.put(`/products`, products)
    },
    addProduct: (product: ProductType):  ApiResponseType<ProductType> => {
        return apiWithConfig.post(`/products`, {...product})
    },
    deleteProduct: (name: string):  ApiResponseType<ProductType> => {
        return apiWithConfig.delete(`/products/${name}`)
    },

}
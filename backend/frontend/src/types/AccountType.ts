import {AccountTypeEnum} from "../enums/AccountTypeEnum.enum.ts";

export interface AccountType {
    id?: string
    username: string
    password?: string
    role: AccountTypeEnum
    authorities?: Object[]
    accountNonExpired?: boolean
    credentialsNonExpired?: boolean
    accountNonLocked?: boolean
    enabled?: boolean
}
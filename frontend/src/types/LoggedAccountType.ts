import {AccountTypeEnum} from "../enums/AccountTypeEnum.enum.ts";

export interface LoggedAccountType {
    username?: string
    role: AccountTypeEnum
    token: string
}
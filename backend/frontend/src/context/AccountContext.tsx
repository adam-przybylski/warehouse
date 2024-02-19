import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {AccountType} from "../types/AccountType.ts";

interface AccountState {
    account: AccountType | null
    setAccount: (item: AccountType | null) => void
    loggedAccount: LoggedAccountType | null
    setLoggedAccount: (item: LoggedAccountType | null) => void
    isLoggingIn: boolean
    setIsLoggingIn: (value: boolean) => void
    isFetching: boolean
    setIsFetching: (value: boolean) => void
}

const AccountStateContext = createContext<AccountState | null>(null)

export const AccountStateContextProvider = ({children}: { children: ReactNode }) => {
    const [account, setAccount] = useState<AccountType | null>(null)
    const [loggedAccount, setLoggedAccount] = useState<LoggedAccountType | null>(null)
    const [isLoggingIn, setIsLoggingIn] = useState(false)
    const [isFetching, setIsFetching] = useState(true)

    useEffect(() => {
        if (loggedAccount?.token) {
            localStorage.setItem('token', JSON.stringify(loggedAccount.token))
        }
    }, [loggedAccount])

    return (
        <AccountStateContext.Provider
            value={{
                account,
                setAccount,
                loggedAccount,
                setLoggedAccount,
                isLoggingIn,
                setIsLoggingIn,
                isFetching,
                setIsFetching
            }}
        >
            {children}
        </AccountStateContext.Provider>
    )
}

export const useAccountState = () => {
    const accountState = useContext(AccountStateContext)

    if (!accountState) {
        throw new Error('You forgot about AccountStateContextProvider!')
    }

    return accountState
}
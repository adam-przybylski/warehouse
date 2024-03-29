import { createContext, ReactNode, useContext, useState } from 'react'
import { AccountType } from '../types/AccountType.ts'

interface AccountDetailsState {
    isFetching: boolean
    setIsFetching: (isFetching: boolean) => void
    account: AccountType | null
    setAccount: (item: AccountType) => void
}

export const AccountDetailsStateContext = createContext<AccountDetailsState | null>(null)

export const AccountDetailsStateContextProvider = ({ children }: { children: ReactNode }) => {
    const [isFetching, setIsFetching] = useState(false)
    const [account, setAccount] = useState<AccountType | null>(null)

    return (
        <AccountDetailsStateContext.Provider value={{ isFetching, setIsFetching, account, setAccount }}>
    {children}
    </AccountDetailsStateContext.Provider>
)
}

export const useAccountDetailsState = () => {
    const accountDetailsState = useContext(AccountDetailsStateContext)

    if (!accountDetailsState) {
        throw new Error('You forgot about AccountDetailsStateContextProvider!')
    }

    return accountDetailsState
}

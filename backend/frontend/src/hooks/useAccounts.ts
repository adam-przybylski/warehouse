import {api} from "../api/api.ts";
import {useAccountsState} from "../context/AccountsContext.tsx";
import {useAlert} from "./useAlert.ts";
import {useState} from "react";
import {AccountType} from "../types/AccountType.ts";

export const useAccounts = () => {
    const {showErrorAlert, showSuccessAlert} = useAlert()
    const {isFetching, setIsFetching, accounts, setAccounts} = useAccountsState()
    const fetchAccounts = async () => {
        try {
            setIsFetching(true)
            const {data} = await api.getAccounts()
            const sortedAccounts = data.sort((a: AccountType, b: AccountType) => a.username.localeCompare(b.username))
            setAccounts(sortedAccounts)
        } catch (error) {
            console.error(JSON.stringify(error))
            showErrorAlert('Wystąpił błąd podczas pobierania kont')
        } finally {
            setIsFetching(false)
        }
    }

    const [isCreating, setIsCreating] = useState(false)
    const createAccount = async (account: AccountType) => {
        try {
            setIsCreating(true)
            await api.addAccount(account).then(() => showSuccessAlert('Konto ' + account.username +' zostało utworzone'))
        } catch {
            showErrorAlert('Wystąpił błąd podczas tworzenia konta')
        } finally {
            setIsCreating(false)
        }
    }


    return {accounts, isFetching, fetchAccounts, isCreating, createAccount}
}
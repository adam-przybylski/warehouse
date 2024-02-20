import { useState } from 'react'
import { api } from '../api/api'
import { useAccountDetailsState } from '../context/AccountDetailsContext'
import { useAlert } from './useAlert'

export const useAccountDetails = () => {
    const { showErrorAlert } = useAlert()
    const { isFetching, setIsFetching, account, setAccount } = useAccountDetailsState()

    const getAccountDetails = async (login: string) => {
        try {
            setIsFetching(true)
            const { data } = await api.getAccount(login)
            setAccount(data)
        } catch {
            showErrorAlert('Nie znaleziono konta o podanej nazwie użytkownika')
        } finally {
            setIsFetching(false)
        }
    }

    const [isUpdating, setIsUpdating] = useState(false)
    const updatePassword = async (username: string | undefined, password: string) => {
        try {
            setIsUpdating(true)
            await api.updatePassword(username, password)
        } catch (err) {
            console.error(err)
            showErrorAlert('Wystąpił błąd podczas aktualizacji hasła')
        } finally {
            setIsUpdating(false)
        }
    }

    const enableAccount = async (username: string) => {
        try {
            setIsUpdating(true)
            await api.enableAccount(username)
        } catch (err) {
            console.error(err)
            showErrorAlert('Wystąpił błąd podczas blokowania konta')
        } finally {
            setIsUpdating(false)
        }
    }

    const disableAccount = async (username: string) => {
        try {
            setIsUpdating(true)
            await api.disableAccount(username)
        } catch (err) {
            console.error(err)
            showErrorAlert('Wystąpił błąd podczas blokowania konta')
        } finally {
            setIsUpdating(false)
        }
    }

    return {
        account,
        isFetching,
        getAccountDetails,
        isUpdating,
        updatePassword,
        enableAccount,
        disableAccount,
    }
}

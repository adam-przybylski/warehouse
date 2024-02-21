import {useState} from 'react'
import {api} from '../api/api'
import {useAccountDetailsState} from '../context/AccountDetailsContext'
import {useAlert} from './useAlert'

export const useAccountDetails = () => {
    const {showErrorAlert, showSuccessAlert} = useAlert()
    const {isFetching, setIsFetching, account, setAccount} = useAccountDetailsState()

    const getAccountDetails = async (login: string) => {
        try {
            setIsFetching(true)
            const {data} = await api.getAccount(login)
            setAccount(data)
        } catch (err) {
            console.error(err)
            showErrorAlert('Nie znaleziono konta ' + login)
        } finally {
            setIsFetching(false)
        }
    }

    const [isUpdating, setIsUpdating] = useState(false)
    const updatePassword = async (username: string | undefined, password: string) => {
        try {
            setIsUpdating(true)
            await api.updatePassword(username, password).then(() => showSuccessAlert('Hasło konta ' + username + ' zostało zaktualizowane'))
        } catch (err) {
            console.error(err)
            showErrorAlert('Wystąpił błąd podczas aktualizacji hasła konta ' + username)
        } finally {
            setIsUpdating(false)
        }
    }

    const enableAccount = async (username: string) => {
        try {
            setIsUpdating(true)
            await api.enableAccount(username).then(() => showSuccessAlert('Konto ' + username + ' zostało odblokowane'))
        } catch (err) {
            console.error(err)
            showErrorAlert('Wystąpił błąd podczas blokowania konta ' + username)
        } finally {
            setIsUpdating(false)
        }
    }

    const disableAccount = async (username: string) => {
        try {
            setIsUpdating(true)
            await api.disableAccount(username).then(() => showSuccessAlert('Konto ' + username + ' zostało zablokowane'))
        } catch (err) {
            console.error(err)
            showErrorAlert('Wystąpił błąd podczas blokowania konta ' + username)
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

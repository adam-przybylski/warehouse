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
        } catch (error: any) {
            console.error(JSON.stringify(error))
            showErrorAlert(error.response.data)
        } finally {
            setIsFetching(false)
        }
    }

    const [isUpdating, setIsUpdating] = useState(false)
    const updatePassword = async (username: string | undefined, password: string) => {
        try {
            setIsUpdating(true)
            await api.updatePassword(username, password).then(() => showSuccessAlert('Hasło konta ' + username + ' zostało zaktualizowane'))
        } catch (error: any) {
            console.error(JSON.stringify(error))
            showErrorAlert(error.response.data)
        } finally {
            setIsUpdating(false)
        }
    }

    const enableAccount = async (username: string) => {
        try {
            setIsUpdating(true)
            await api.enableAccount(username).then(() => showSuccessAlert('Konto ' + username + ' zostało odblokowane'))
        } catch (error: any) {
            console.error(JSON.stringify(error))
            showErrorAlert(error.response.data)
        } finally {
            setIsUpdating(false)
        }
    }

    const disableAccount = async (username: string) => {
        try {
            setIsUpdating(true)
            await api.disableAccount(username).then(() => showSuccessAlert('Konto ' + username + ' zostało zablokowane'))
        } catch (error: any) {
            console.error(JSON.stringify(error))
            showErrorAlert(error.response.data)
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

import {useClientsState} from "../context/ClientsContext.tsx";
import {useAlert} from "./useAlert.ts";
import {api} from "../api/api.ts";
import {ClientType} from "../types/ClientType.ts";
import {useState} from "react";

export const useClients = () => {
    const {showErrorAlert, showSuccessAlert} = useAlert()
    const {isFetching, setIsFetching, clients, setClients} = useClientsState()

    const fetchClients = async () => {
        try {
            setIsFetching(true)
            const {data} = await api.getClients()
            const sortedClients = data.sort((a: ClientType, b: ClientType) => a.name.localeCompare(b.name))
            setClients(sortedClients)
        } catch (error: any) {
            console.error(JSON.stringify(error))
            showErrorAlert(error.response.data)
        } finally {
            setIsFetching(false)
        }
    }

    const [isCreating, setIsCreating] = useState(false)

    const createClient = async (client: ClientType) => {
        try {
            setIsCreating(true)
            await api.addClient(client).then(() => showSuccessAlert('Klient ' + client.name +' został utworzony'))
        } catch (error: any) {
            console.error(JSON.stringify(error))
            showErrorAlert(error.response.data)
        } finally {
            setIsCreating(false)
        }
    }

    const [isDeleting, setIsDeleting] = useState(false)

    const deleteClient = async (name: string | undefined) => {
        try {
            setIsDeleting(true)
            await api.deleteClient(name).then(() => showSuccessAlert('Klient ' + name +' został usunięty'))
        } catch (error: any) {
            console.error(JSON.stringify(error))
            showErrorAlert(error.response.data)
        } finally {
            setIsDeleting(false)
        }
    }

    return {clients, isFetching, fetchClients, isCreating, createClient, isDeleting, deleteClient}
}
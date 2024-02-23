import {ClientType} from "../types/ClientType.ts";
import {createContext, ReactNode, useContext, useState} from "react";

interface ClientsState {
    isFetching: boolean
    setIsFetching: (isFetching: boolean) => void
    clients: ClientType[] | null
    setClients: (item: ClientType[] | null) => void
}

export const ClientsStateContext = createContext<ClientsState | null>(null)

export const ClientsStateContextProvider = ({ children }: { children: ReactNode }) => {
    const [isFetching, setIsFetching] = useState(false)
    const [clients, setClients] = useState<ClientType[] | null>(null)

    return (
        <ClientsStateContext.Provider value={{ isFetching, setIsFetching, clients, setClients }}>
            {children}
        </ClientsStateContext.Provider>
    )
}

export const useClientsState = () => {
    const clientsState = useContext(ClientsStateContext)

    if (!clientsState) {
        throw new Error('You forgot about ClientsStateContextProvider!')
    }

    return clientsState
}
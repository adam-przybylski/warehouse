import {useClients} from "../../../hooks/useClients.ts";
import {useEffect, useState} from "react";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import {LoaderComponent} from "../../../components/Loader";
import {AddClientModalComponent} from "../../../components/AddClientModal";
import {ClientType} from "../../../types/ClientType.ts";
import {useAccount} from "../../../hooks/useAccount.ts";
import {ConfirmModalComponent} from "../../../components/ConfirmModal";

export const ClientsPageComponent = () => {
    const {clients, isFetching, fetchClients, isDeleting, deleteClient} = useClients()
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [filteredClients, setFilteredClients] = useState<ClientType[] | null>([]);
    const {isUser} = useAccount()
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

    useEffect(() => {
        if (!clients) {
            fetchClients()
        }
    }, []);

    useEffect(() => {
        filterClients('')
    }, [clients]);

    const filterClients = (search: string) => {
        if (search.length === 0 || search === '' || search === null) {
            setFilteredClients(clients)
        }
        const filtered = clients?.filter((client) => {
            return client.name.toLowerCase().includes(search.toLowerCase())
        })
        setFilteredClients(filtered ?? [])
    }

    const openAddClientModal = () => {
        setIsCreateModalOpen(true)
    }

    const closeAddClientModal = () => {
        setIsCreateModalOpen(false)
        fetchClients()
    }

    const handleDeleteClient = (name: string) => {
        deleteClient(name).then(fetchClients)
    }

    const openConfirmModal = () => {
        setIsConfirmModalOpen(true)
    }

    const closeConfirmModal = () => {
        setIsConfirmModalOpen(false)
    }


    const renderTable = () => {
        if (!filteredClients || filteredClients.length === 0) {
            return <div>Brak wyników</div>
        }

        return (
            <Table sx={{minWidth: 450}}>
                <TableHead sx={{background: '#605f5f'}}>
                    <TableRow>
                        <TableCell sx={{color: '#ffffff', fontSize: '1.2rem'}}>Nazwa</TableCell>
                        <TableCell sx={{color: '#ffffff', fontSize: '1.2rem', textAlign: 'center'}}>Miasto</TableCell>
                        <TableCell sx={{color: '#ffffff', fontSize: '1.2rem'}}></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {filteredClients.map((client) => (
                        <TableRow
                            key={client.id}
                            hover
                        >
                            <TableCell component="th" scope="row" sx={{fontSize: '1.1rem'}}>
                                {client.name}
                            </TableCell>
                            <TableCell align="center" sx={{fontSize: '1.1rem'}}>
                                {client.city}
                            </TableCell>
                            <TableCell align="right">
                                {
                                    isUser &&
                                    <Button variant="contained" color="primary"
                                            onClick={openConfirmModal}
                                            disabled={isDeleting}
                                    >
                                        USUŃ
                                    </Button>
                                }

                            </TableCell>
                            {
                                isUser &&
                                <ConfirmModalComponent
                                    title={'Usuwanie klienta'}
                                    open={isConfirmModalOpen}
                                    handleConfirm={() => handleDeleteClient(client.name)}
                                    handleClose={closeConfirmModal}
                                    children={<p>Czy na pewno chcesz usunąć klienta {client.name}?</p>}
                                />
                            }

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    }

    return (
        <div>
            <div style={{display: 'flex'}}>
                <Button variant="contained" onClick={fetchClients} disabled={isFetching} sx={{my: 2, mr: 1}}>
                    Odśwież
                </Button>

                {
                    isUser &&
                    <Button variant="contained" onClick={openAddClientModal} sx={{my: 2}}>
                        Dodaj nowego klienta
                    </Button>
                }

                <TextField
                    type="text"
                    label="Szukaj"
                    onChange={(event) => filterClients(event.target.value)}
                    sx={{ml: 'auto'}}
                />
            </div>

            <TableContainer component={Paper}>
                {isFetching ? <LoaderComponent small/> : renderTable()}
            </TableContainer>

            <AddClientModalComponent open={isCreateModalOpen} handleClose={closeAddClientModal}/>
        </div>
    )
}

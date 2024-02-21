import {useClients} from "../../../hooks/useClients.ts";
import {useEffect, useState} from "react";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {LoaderComponent} from "../../../components/Loader";
import {AddClientModalComponent} from "../../../components/AddClientModal";

export const ClientsPageComponent = () => {
    const {clients, isFetching, fetchClients, isDeleting, deleteClient} = useClients()
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    useEffect(() => {
        if (!clients) {
            fetchClients()
        }
    }, []);

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


    const renderTable = () => {
        if (!clients) {
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
                    {clients.map((client) => (
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
                                <Button variant="contained" color="primary"
                                        onClick={() => handleDeleteClient(client.name)}
                                        disabled={isDeleting}
                                >
                                    USUŃ
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    }

    return (
        <div>
            <Button onClick={fetchClients} disabled={isFetching} sx={{my: 2}}>
                Odśwież
            </Button>
            <Button onClick={openAddClientModal} sx={{my: 2}}>
                Dodaj nowego klienta
            </Button>

            <TableContainer component={Paper}>
                {isFetching ? <LoaderComponent small/> : renderTable()}
            </TableContainer>

            <AddClientModalComponent open={isCreateModalOpen} handleClose={closeAddClientModal}/>
        </div>
    )
}

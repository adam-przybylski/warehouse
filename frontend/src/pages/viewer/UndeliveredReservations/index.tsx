import {useReservations} from "../../../hooks/useReservations.ts";
import {useEffect, useState} from "react";
import {ReservationGet} from "../../../types/ReservationType.ts";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import {LoaderComponent} from "../../../components/Loader";
import {solveUnit} from "../../user/ReservationsPage";
import {PaymentConfirmationEnum} from "../../../enums/PaymentConfirmationEnum.enum.ts";
import {DeliveryTypeEnum} from "../../../enums/DeliveryTypeEnum.enum.ts";
import {useAccount} from "../../../hooks/useAccount.ts";
import {ConfirmModalComponent} from "../../../components/ConfirmModal";

const solvePaymentConfirmation = (paymentConfirmation: string) => {
    if (paymentConfirmation.toLowerCase() === PaymentConfirmationEnum.INVOICE.toString().toLowerCase()) {
        return 'Faktura'
    } else if (paymentConfirmation.toLowerCase() === PaymentConfirmationEnum.RECEIPT.toString().toLowerCase()) {
        return 'Paragon'
    } else {
        return 'Zestaw upominkowy'
    }
}

const solveDeliveryType = (deliveryType: string) => {
    if (deliveryType.toLowerCase() === DeliveryTypeEnum.DELIVERY.toString().toLowerCase()) {
        return 'Dostawa'
    } else {
        return 'Przesyłka'
    }
}

export const UndeliveredReservationsPageComponent = () => {

    const {
        undeliveredReservations,
        isFetching,
        fetchUndeliveredReservations,
        isUpdating,
        updateReservation,
        isDeleting,
        deleteReservation
    } = useReservations()
    const [sortedReservations, setSortedReservations] = useState<ReservationGet[] | null>([]);

    const {isUser} = useAccount()

    const [isConfirmDeliveredModalOpen, setIsConfirmDeliveredModalOpen] = useState(false)
    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false)

    const handlechangepage = (event: any, newpage: number) => {
        event.preventDefault()
        pagechange(newpage)
    }
    const handleRowsPerPage = (event: any) => {
        event.preventDefault()
        rowperpagechange(+event.target.value)
        pagechange(0);
    }

    const [rows, rowchange] = useState<ReservationGet[] | null>([]);
    const [page, pagechange] = useState(0);
    const [rowperpage, rowperpagechange] = useState(5);

    useEffect(() => {
        if (!undeliveredReservations) {
            fetchUndeliveredReservations()
        }
    }, []);

    useEffect(() => {
        sortReservationsByReservationDate()
        // rowchange(sortedReservations)
    }, [undeliveredReservations]);

    const sortReservationsByReservationDate = () => {
        if (!undeliveredReservations) {
            return
        }
        const sorted = [...undeliveredReservations].sort((a, b) => {
            return new Date(b.reservationDate).getTime() - new Date(a.reservationDate).getTime()
        })
        setSortedReservations(sorted)
        rowchange(sorted)
    }

    const sortReservationsByClientName = () => {
        if (!undeliveredReservations) {
            return
        }
        const sorted = [...undeliveredReservations].sort((a, b) => {
            return a.client.name.localeCompare(b.client.name)
        })
        setSortedReservations(sorted)
        rowchange(sorted)
    }

    const handleUpdate = (id: string) => {
        updateReservation(id).then(fetchUndeliveredReservations)
    }

    const handleDelete = (id: string) => {
        deleteReservation(id).then(fetchUndeliveredReservations)
    }

    const openConfirmDeliveredModal = () => {
        setIsConfirmDeliveredModalOpen(true)
    }

    const openConfirmDeleteModal = () => {
        setIsConfirmDeleteModalOpen(true)
    }

    const closeConfirmDeliveredModal = () => {
        setIsConfirmDeliveredModalOpen(false)
    }

    const closeConfirmDeleteModal = () => {
        setIsConfirmDeleteModalOpen(false)
    }

    const renderTable = () => {
        if (!sortedReservations || sortedReservations.length === 0) {
            return <div>Brak wyników</div>
        }
        return (
            <Table sx={{minWidth: 500}}>
                <TableHead sx={{background: '#605f5f'}}>
                    <TableRow>
                        <TableCell onClick={sortReservationsByClientName}
                                   sx={{color: '#ffffff', fontSize: '1.1rem', cursor: 'pointer'}}>Nazwa
                            klienta</TableCell>
                        <TableCell onClick={sortReservationsByReservationDate}
                                   sx={{color: '#ffffff', fontSize: '1.1rem', textAlign: 'center', cursor: 'pointer'}}>Data
                            rezerwacji</TableCell>
                        <TableCell sx={{color: '#ffffff', fontSize: '1.1rem', textAlign: 'center'}}>Data
                            dostawy</TableCell>
                        <TableCell sx={{color: '#ffffff', fontSize: '1.1rem', textAlign: 'center'}}>Typ
                            dostawy</TableCell>
                        <TableCell sx={{color: '#ffffff', fontSize: '1.1rem', textAlign: 'center'}}>Forma
                            płatności</TableCell>
                        <TableCell sx={{color: '#ffffff', fontSize: '1.1rem', textAlign: 'center'}}>Produkty</TableCell>
                        <TableCell sx={{color: '#ffffff', fontSize: '1.1rem', textAlign: 'center'}}></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows &&
                        rows.slice(page * rowperpage, page * rowperpage + rowperpage)
                            .map(({
                                      id,
                                      client,
                                      reservationDate,
                                      deliveryDate,
                                      deliveryType,
                                      paymentConfirmation,
                                      products
                                  }) => (
                                <TableRow key={id}>
                                    <TableCell>{client.name}</TableCell>
                                    <TableCell sx={{textAlign: 'center'}}>{reservationDate}</TableCell>
                                    <TableCell sx={{textAlign: 'center'}}>{deliveryDate}</TableCell>
                                    <TableCell sx={{textAlign: 'center'}}>{solveDeliveryType(deliveryType)}</TableCell>
                                    <TableCell
                                        sx={{textAlign: 'center'}}>{solvePaymentConfirmation(paymentConfirmation)}</TableCell>
                                    <TableCell sx={{textAlign: 'center'}}>
                                        <ol>
                                            {products.map(({id, name, unit, numberOfUnits}) => (
                                                <li key={id}>{name} - {numberOfUnits} x {solveUnit(unit)}</li>
                                            ))}
                                        </ol>
                                    </TableCell>
                                    <TableCell sx={{textAlign: 'center'}}>
                                        {
                                            isUser &&
                                            <Button
                                                variant="contained"
                                                onClick={openConfirmDeliveredModal}
                                                disabled={isUpdating}
                                                sx={{mr: 1, background: '#057505', color: '#ffffff', fontSize: '0.8em'}}
                                            >
                                                Dostarczone
                                            </Button>
                                        }
                                        {
                                            isUser &&
                                            <ConfirmModalComponent
                                                title={'Potwierdzenie dostarczenia'}
                                                open={isConfirmDeliveredModalOpen}
                                                handleConfirm={() => handleUpdate(id)}
                                                handleClose={closeConfirmDeliveredModal}
                                                children={<p>Czy na pewno chcesz potwierdzić dostarczenie zamówienia
                                                    klienta {client.name}?</p>}
                                            />
                                        }


                                        {
                                            isUser &&
                                            <Button
                                                variant="contained"
                                                color="error"
                                                disabled={isDeleting}
                                                onClick={openConfirmDeleteModal}
                                                sx={{ml: 1, fontSize: '0.8em'}}
                                            >
                                                Usuń
                                            </Button>
                                        }

                                        {
                                            isUser &&
                                            <ConfirmModalComponent
                                                title={'Usuwanie zamówienia'}
                                                open={isConfirmDeleteModalOpen}
                                                handleConfirm={() => handleDelete(id)}
                                                handleClose={closeConfirmDeleteModal}
                                                children={<p>Czy na pewno chcesz usunąć zamówienie
                                                    klienta {client.name}?</p>}
                                            />
                                        }

                                    </TableCell>
                                </TableRow>
                            ))}
                </TableBody>
            </Table>
        )


    }


    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={fetchUndeliveredReservations}
                disabled={isFetching}
                sx={{my: 2}}
            >
                Odśwież
            </Button>

            <Paper>
                <TableContainer>
                    {isFetching ? <LoaderComponent small/> : renderTable()}
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    rowsPerPage={rowperpage}
                    page={page}
                    count={rows?.length || 0}
                    component="div"
                    onPageChange={handlechangepage}
                    onRowsPerPageChange={handleRowsPerPage}
                >
                </TablePagination>
            </Paper>
        </div>

    )
}
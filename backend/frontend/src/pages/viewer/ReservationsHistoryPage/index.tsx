import {useReservations} from "../../../hooks/useReservations.ts";
import {useEffect, useState} from "react";
import {ReservationGet} from "../../../types/ReservationType.ts";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {LoaderComponent} from "../../../components/Loader";
import {solveUnit} from "../../user/ReservationsPage";
import {PaymentConfirmationEnum} from "../../../enums/PaymentConfirmationEnum.enum.ts";
import {DeliveryTypeEnum} from "../../../enums/DeliveryTypeEnum.enum.ts";
import {useAccount} from "../../../hooks/useAccount.ts";

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

export const ReservationsHistoryPageComponent = () => {

    const {
        reservations,
        isFetching,
        fetchReservations,
        isUpdating,
        updateReservation,
        isDeleting,
        deleteReservation
    } = useReservations()
    const [sortedReservations, setSortedReservations] = useState<ReservationGet[] | null>([]);

    const {isUser} = useAccount()

    useEffect(() => {
        if (!reservations) {
            fetchReservations()
        }
    }, []);

    useEffect(() => {
        sortReservationsByReservationDate()
    }, [reservations]);

    const sortReservationsByReservationDate = () => {
        if (!reservations) {
            return
        }
        const sorted = [...reservations].sort((a, b) => {
            return new Date(b.reservationDate).getTime() - new Date(a.reservationDate).getTime()
        })
        setSortedReservations(sorted)
    }

    const handleUpdate = (id: string) => {
        updateReservation(id).then(fetchReservations)
    }

    const handleDelete = (id: string) => {
        deleteReservation(id).then(fetchReservations)
    }

    const renderTable = () => {
        if (!sortedReservations || sortedReservations.length === 0) {
            return <div>Brak wyników</div>
        }
        return (
            <Table sx={{minWidth: 500}}>
                <TableHead sx={{background: '#605f5f'}}>
                    <TableRow>
                        <TableCell sx={{color: '#ffffff', fontSize: '1.1rem'}}>Nazwa klienta</TableCell>
                        <TableCell sx={{color: '#ffffff', fontSize: '1.1rem', textAlign: 'center'}}>Data
                            rezerwacji</TableCell>
                        <TableCell sx={{color: '#ffffff', fontSize: '1.1rem', textAlign: 'center'}}>Data
                            dostawy</TableCell>
                        <TableCell sx={{color: '#ffffff', fontSize: '1.1rem', textAlign: 'center'}}>Typ
                            dostawy</TableCell>
                        <TableCell sx={{color: '#ffffff', fontSize: '1.1rem', textAlign: 'center'}}>Czy
                            dostarczone</TableCell>
                        <TableCell sx={{color: '#ffffff', fontSize: '1.1rem', textAlign: 'center'}}>Forma
                            płatności</TableCell>
                        <TableCell sx={{color: '#ffffff', fontSize: '1.1rem', textAlign: 'center'}}>Produkty</TableCell>
                        <TableCell sx={{color: '#ffffff', fontSize: '1.1rem', textAlign: 'center'}}></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {sortedReservations.map(({
                                                 id,
                                                 client,
                                                 reservationDate,
                                                 deliveryDate,
                                                 deliveryType,
                                                 delivered,
                                                 paymentConfirmation,
                                                 products
                                             }) => (
                        <TableRow key={id}>
                            <TableCell>{client.name}</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>{reservationDate}</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>{deliveryDate}</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>{solveDeliveryType(deliveryType)}</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>{delivered ? 'Tak' : 'Nie'}</TableCell>
                            <TableCell
                                sx={{textAlign: 'center'}}>{solvePaymentConfirmation(paymentConfirmation)}</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>
                                <ol>
                                    {products.map(({name, unit, numberOfUnits}) => (
                                        <li key={name}>{name} - {numberOfUnits} x {solveUnit(unit)}</li>
                                    ))}
                                </ol>
                            </TableCell>
                            <TableCell sx={{textAlign: 'center'}}>
                                {
                                    isUser &&
                                    <Button
                                        variant="contained"
                                        onClick={() => handleUpdate(id)}
                                        disabled={isUpdating}
                                        sx={{mr: 1, background: '#057505', color: '#ffffff', fontSize: '0.8em'}}
                                    >
                                        Dostarczone
                                    </Button>
                                }
                                {
                                    isUser &&
                                    <Button
                                        variant="contained"
                                        color="error"
                                        disabled={isDeleting}
                                        onClick={() => handleDelete(id)}
                                        sx={{ml: 1, fontSize: '0.8em'}}
                                    >
                                        Usuń
                                    </Button>
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
                onClick={fetchReservations}
                disabled={isFetching}
                sx={{my: 2}}
            >
                Odśwież
            </Button>

            <Paper>
                <TableContainer>
                    {isFetching ? <LoaderComponent small/> : renderTable()}
                </TableContainer>
            </Paper>
        </div>

    )
}
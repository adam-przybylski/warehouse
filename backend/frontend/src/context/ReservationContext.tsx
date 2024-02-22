import {ReservationGet} from "../types/ReservationType.ts";
import {createContext, useContext, useState} from "react";

interface ReservationState {
    isFetching: boolean;
    setIsFetching: (isFetching: boolean) => void;
    reservations: ReservationGet[] | null;
    setReservations: (reservations: ReservationGet[] | null) => void;
    deliveredReservations: ReservationGet[] | null;
    setDeliveredReservations: (reservations: ReservationGet[] | null) => void;
    undeliveredReservations: ReservationGet[] | null;
    setUndeliveredReservations: (reservations: ReservationGet[] | null) => void;
}

export const ReservationStateContext = createContext<ReservationState | null>(null)

export const ReservationStateContextProvider = ({children}: {children: React.ReactNode}) => {
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [reservations, setReservations] = useState<ReservationGet[] | null>(null);
    const [deliveredReservations, setDeliveredReservations] = useState<ReservationGet[] | null>(null);
    const [undeliveredReservations, setUndeliveredReservations] = useState<ReservationGet[] | null>(null);

    return (
        <ReservationStateContext.Provider value={{
            isFetching,
            setIsFetching,
            reservations,
            setReservations,
            deliveredReservations,
            setDeliveredReservations,
            undeliveredReservations,
            setUndeliveredReservations
        }}>
            {children}
        </ReservationStateContext.Provider>
    )
}

export const useReservationsState = () => {
    const reservationState = useContext(ReservationStateContext)

    if (!reservationState) {
        throw new Error('You forgot about ReservationStateContextProvider!')
    }

    return reservationState
}
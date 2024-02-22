import {useAlert} from "./useAlert.ts";
import {useReservationsState} from "../context/ReservationContext.tsx";
import {api} from "../api/api.ts";
import {ReservationPost} from "../types/ReservationType.ts";
import {useState} from "react";

export const useReservations = () => {
    const {showErrorAlert, showSuccessAlert} = useAlert()
    const {
        isFetching,
        setIsFetching,
        reservations,
        setReservations,
        deliveredReservations,
        setDeliveredReservations,
        undeliveredReservations,
        setUndeliveredReservations
    } = useReservationsState()

    const fetchReservations = async () => {
        try {
            setIsFetching(true)
            const {data} = await api.getReservations()
            setReservations(data)
        } catch (error: any) {
            console.error(JSON.stringify(error))
            showErrorAlert(error.response.data)
        } finally {
            setIsFetching(false)
        }
    }

    const fetchDeliveredReservations = async () => {
        try {
            setIsFetching(true)
            const {data} = await api.getDeliveredReservations()
            setDeliveredReservations(data)
        } catch (error: any) {
            console.error(JSON.stringify(error))
            showErrorAlert(error.response.data)
        } finally {
            setIsFetching(false)
        }
    }

    const fetchUndeliveredReservations = async () => {
        try {
            setIsFetching(true)
            const {data} = await api.getUndeliveredReservations()
            setUndeliveredReservations(data)
        } catch (error: any) {
            console.error(JSON.stringify(error))
            showErrorAlert(error.response.data)
        } finally {
            setIsFetching(false)
        }
    }

    const [isAdding, setIsAdding] = useState(false)
    const addReservation = async (reservation: ReservationPost) => {
        try {
            setIsFetching(true)
            await api.addReservation(reservation).then(() => showSuccessAlert('Rezerwacja została dodana'))
        } catch (error: any) {
            console.error(JSON.stringify(error))
            showErrorAlert(error.response.data)
        } finally {
            setIsAdding(false)
        }
    }

    const updateReservation = async (reservation: ReservationPost) => {
        try {
            setIsFetching(true)
            await api.addReservation(reservation).then(() => showSuccessAlert('Rezerwacja została zaktualizowana'))
        } catch (error: any) {
            console.error(JSON.stringify(error))
            showErrorAlert(error.response.data)
        } finally {
            setIsFetching(false)
        }
    }

    return {
        reservations,
        deliveredReservations,
        undeliveredReservations,
        isFetching,
        isAdding,
        fetchReservations,
        fetchDeliveredReservations,
        fetchUndeliveredReservations,
        addReservation,
        updateReservation
    }

}
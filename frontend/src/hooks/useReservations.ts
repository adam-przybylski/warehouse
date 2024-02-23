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
            setIsAdding(true)
            await api.addReservation(reservation).then(() => window.location.reload()).then(() => showSuccessAlert('Rezerwacja została dodana'))
        } catch (error: any) {
            console.error(JSON.stringify(error))
            showErrorAlert(error.response.data)
        } finally {
            setIsAdding(false)
        }
    }

    const [isUpdating, setIsUpdating] = useState(false)

    const updateReservation = async (id: string) => {
        try {
            setIsUpdating(true)
            await api.updateReservationStatus(id).then(() => showSuccessAlert('Rezerwacja została zaktualizowana'))
        } catch (error: any) {
            console.error(JSON.stringify(error))
            showErrorAlert(error.response.data)
        } finally {
            setIsUpdating(false)
        }
    }

    const [isDeleting, setIsDeleting] = useState(false)
    const deleteReservation = async (id: string) => {
        try {
            setIsDeleting(true)
            await api.deleteReservation(id).then(() => showSuccessAlert('Rezerwacja została usunięta'))
        } catch (error: any) {
            console.error(JSON.stringify(error))
            showErrorAlert(error.response.data)
        } finally {
            setIsDeleting(false)
        }
    }

    return {
        reservations,
        deliveredReservations,
        undeliveredReservations,
        isFetching,
        isAdding,
        isUpdating,
        isDeleting,
        fetchReservations,
        fetchDeliveredReservations,
        fetchUndeliveredReservations,
        addReservation,
        updateReservation,
        deleteReservation
    }

}
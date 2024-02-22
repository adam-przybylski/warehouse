package com.warehouse.controller;


import com.warehouse.dto.ReservationDto;
import com.warehouse.entity.Reservation;
import com.warehouse.service.ReservationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@RequestMapping("/api/v1/reservations")
@RequiredArgsConstructor
public class ReservationController {
    private final ReservationService reservationService;


    @GetMapping(value = "/client/{clientName}", produces = "application/json")
    public List<Reservation> getReservationsByClientId(@PathVariable String clientName) {
        return reservationService.getReservationsByClientName(clientName);
    }

    @GetMapping(value = "{reservationId}", produces = "application/json")
    public Reservation getReservationsById(@PathVariable String reservationId) {
        return reservationService.getReservationById(reservationId);
    }

    @GetMapping(value = "/status/{status}", produces = "application/json")
    public List<Reservation> getReservationsByStatus(@PathVariable String status) {
        return reservationService.getReservationsByStatus(status);
    }

    @GetMapping(produces = "application/json")
    public List<Reservation> getAllReservations() {
        return reservationService.getAllReservations();
    }

    @PatchMapping(value = "/{reservationId}", produces = "application/json")
    public Reservation updateReservationStatus(@PathVariable String reservationId) {
        return reservationService.markReservationAsDelivered(reservationId);
    }

    @PostMapping(produces = "application/json", consumes = "application/json")
    public Reservation addReservation(@RequestBody @Valid ReservationDto reservationDto) {
        return reservationService.addReservation(reservationDto);
    }

    @DeleteMapping(value = "/{reservationId}", produces = "application/json")
    public void deleteReservation(@PathVariable String reservationId) {
        reservationService.deleteReservationById(reservationId);
    }


}

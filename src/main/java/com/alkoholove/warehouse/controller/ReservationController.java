package com.alkoholove.warehouse.controller;


import com.alkoholove.warehouse.dto.ReservationDto;
import com.alkoholove.warehouse.entity.Reservation;
import com.alkoholove.warehouse.service.ReservationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

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


}

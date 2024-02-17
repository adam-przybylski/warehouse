package com.warehouse.service;

import com.warehouse.dto.ProductDto;
import com.warehouse.dto.ReservationDto;
import com.warehouse.entity.Client;
import com.warehouse.entity.Product;
import com.warehouse.entity.Reservation;
import com.warehouse.enums.DeliveryType;
import com.warehouse.enums.PaymentConfirmation;
import com.warehouse.exceptions.ResourceNotFoundException;
import com.warehouse.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final ClientService clientService;
    private final ProductService productService;


    public PaymentConfirmation solvePaymentConfirmation(String paymentConfirmation) {
        return switch (paymentConfirmation) {
            case "invoice" -> PaymentConfirmation.INVOICE;
            case "receipt" -> PaymentConfirmation.RECEIPT;
            default -> null;
        };
    }

    public DeliveryType solveDeliveryType(String deliveryType) {
        return switch (deliveryType) {
            case "delivery" -> DeliveryType.DELIVERY;
            case "shipment" -> DeliveryType.SHIPMENT;
            default -> null;
        };
    }

    public Reservation addReservation(ReservationDto reservationDto) {
        Client client = clientService.getClientByName(reservationDto.getClientName());
        List<Product> products = new ArrayList<>();
        for (ProductDto productDto : reservationDto.getProducts()) {
            Product product = productService.getProductByName(productDto.getName());
            if (product.getNumberOfUnits() < productDto.getNumberOfUnits()) {
                throw new IllegalArgumentException("Not enough items of " + productDto.getName());
            }
            product.setNumberOfUnits(product.getNumberOfUnits() - productDto.getNumberOfUnits());
            productService.updateNumberOfItems(product);
            products.add(product);
        }
        if (products.isEmpty()) {
            throw new IllegalArgumentException("No products in reservation");
        }
        if (reservationDto.getDeliveryDate().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Delivery date cannot be in the past");
        }
        Reservation reservation = new Reservation(client, products, LocalDateTime.now(), reservationDto.getDeliveryDate(),
                solvePaymentConfirmation(reservationDto.getPaymentConfirmation()), solveDeliveryType(reservationDto.getDeliveryType()));
        reservationRepository.save(reservation);
        return reservation;
    }

    public Reservation getReservationById(String id) {
        return reservationRepository.findById(UUID.fromString(id)).orElseThrow(() -> new ResourceNotFoundException("Reservation with id " + id + " " +
                "not found"));
    }

    public List<Reservation> getReservationsByClientName(String name) {
        Client client = clientService.getClientByName(name);
        return reservationRepository.findByClientId(client.getId());
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Reservation markReservationAsDelivered(String id) {
        Reservation reservation = getReservationById(id);
        reservation.setDelivered(true);
        reservationRepository.save(reservation);
        return reservation;
    }


    public List<Reservation> getReservationsByStatus(String status) {
        switch (status) {
            case "delivered" -> {
                return reservationRepository.findByDelivered(true);
            }
            case "undelivered" -> {
                return reservationRepository.findByDelivered(false);
            }
            default -> throw new IllegalArgumentException("Invalid status");
        }
    }
}

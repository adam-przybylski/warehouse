package com.warehouse.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class ReservationDto {

    @JsonProperty("id")
    private UUID id;

    @NotNull(message = "Klient nie może być pusty")
    @Size(min = 1, message = "Nazwa klienta powinna mieć co najmniej 1 znak")
    @JsonProperty("clientName")
    private String clientName;

    @NotNull(message = "Products cannot be null")
    @Size(min = 1, message = "Zamówienie musi zawierać co najmniej 1 produkt")
    @JsonProperty("products")
    private ProductDto[] products;

    @JsonProperty("deliveryDate")
    @NotNull(message = "Data dostawy nie może być pusta")
    @JsonFormat
            (shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate deliveryDate;

    @JsonProperty("paymentConfirmation")
    @Pattern(regexp = "invoice|receipt|gift", message = "Payment confirmation should be invoice or receipt")
    private String paymentConfirmation;

    @JsonProperty("deliveryType")
    @Pattern(regexp = "delivery|shipment|gift", message = "Delivery type should be delivery or shipment")
    private String deliveryType;

    @JsonProperty("isDelivered")
    private boolean isDelivered;

    @JsonCreator
    public ReservationDto(@JsonProperty("id") UUID id,
                          @JsonProperty("clientName") String clientName,
                          @JsonProperty("products") ProductDto[] products,
                          @JsonProperty("deliveryDate") LocalDate deliveryDate,
                          @JsonProperty("paymentConfirmation") String paymentConfirmation,
                          @JsonProperty("deliveryType") String deliveryType,
                          @JsonProperty("isDelivered") boolean isDelivered) {
        this.id = id;
        this.clientName = clientName;
        this.products = products;
        this.deliveryDate = deliveryDate;
        this.paymentConfirmation = paymentConfirmation;
        this.deliveryType = deliveryType;
        this.isDelivered = isDelivered;
    }

    public ReservationDto(String clientName, ProductDto[] products, LocalDate deliveryDate, String paymentConfirmation, String deliveryType) {
        this.clientName = clientName;
        this.products = products;
        this.deliveryDate = deliveryDate;
        this.paymentConfirmation = paymentConfirmation;
        this.deliveryType = deliveryType;
    }

}

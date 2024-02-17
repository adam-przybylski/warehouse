package com.warehouse.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class ReservationDto {

    @JsonProperty("id")
    private UUID id;

    @NotNull(message = "Client name cannot be null")
    @Size(min = 1, message = "Client name should have at least 1 character")
    @JsonProperty("clientName")
    private String clientName;

    @NotNull(message = "Products cannot be null")
    @Size(min = 1, message = "There should be at least one product")
    @JsonProperty("products")
    private ProductDto[] products;

    @JsonProperty("deliveryDate")
    @JsonFormat
            (shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime deliveryDate;

    @JsonProperty("paymentConfirmation")
    @Pattern(regexp = "invoice|receipt", message = "Payment confirmation should be invoice or receipt")
    private String paymentConfirmation;

    @JsonProperty("deliveryType")
    @Pattern(regexp = "delivery|shipment", message = "Delivery type should be delivery or shipment")
    private String deliveryType;

    @JsonProperty("isDelivered")
    private boolean isDelivered;

    @JsonCreator
    public ReservationDto(@JsonProperty("id") UUID id,
                          @JsonProperty("clientName") String clientName,
                          @JsonProperty("products") ProductDto[] products,
                          @JsonProperty("deliveryDate") LocalDateTime deliveryDate,
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

    public ReservationDto(String clientName, ProductDto[] products, LocalDateTime deliveryDate, String paymentConfirmation, String deliveryType) {
        this.clientName = clientName;
        this.products = products;
        this.deliveryDate = deliveryDate;
        this.paymentConfirmation = paymentConfirmation;
        this.deliveryType = deliveryType;
    }

}

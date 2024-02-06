package com.alkoholove.warehouse.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProductDto {

    @NotNull
    @Min(value = 0, message = "Quantity cannot be negative")
    @JsonProperty("quantity")
    int quantity;

    public UpdateProductDto(@JsonProperty("quantity") int quantity) {
        this.quantity = quantity;
    }
}

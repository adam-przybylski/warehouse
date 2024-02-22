package com.warehouse.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.UUID;

@Data
public class ClientDto {

    @JsonProperty("id")
    private UUID id;

    @NotNull(message = "Nazwa nie może być pusta")
    @Size(min = 1, max = 250, message = "Nazwa powinna mieć co najmniej 1 znak i maksymalnie 250 znaków")
    @JsonProperty("name")
    private String name;

    @NotNull(message = "Miasto nie może być puste")
    @Size(min = 1, max = 250, message = "Miasto powinno mieć co najmniej 1 znak i maksymalnie 250 znaków")
    @JsonProperty("city")
    private String city;

    @JsonCreator
    public ClientDto(@JsonProperty("id") UUID id,
                     @JsonProperty("name") String name,
                     @JsonProperty("city") String city) {
        this.id = id;
        this.name = name;
        this.city = city;
    }

    public ClientDto(String name, String city) {
        this.name = name;
        this.city = city;
    }

}

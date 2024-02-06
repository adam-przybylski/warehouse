package com.alkoholove.warehouse.dto;

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

    @NotNull(message = "Name cannot be null")
    @Size(min = 1, max = 250, message = "Name should have at least 1 character and maximum 250")
    @JsonProperty("name")
    private String name;

    @NotNull(message = "City cannot be null")
    @Size(min = 1, max = 250, message = "City should have at least 1 character and maximum 250")
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

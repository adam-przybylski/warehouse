package com.warehouse.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.util.UUID;

@Data
public class ProductDto {

    @JsonProperty("id")
    private UUID id;

    @NotNull(message = "Nazwa nie może być pusta")
    @Size(min = 1, max = 250, message = "Nazwa powinna mieć co najmniej 1 znak i maksymalnie 250 znaków")
    @JsonProperty("name")
    private String name;

    @JsonProperty("unit")
    @Pattern(regexp = "bottle|carton|pack", message = "Type of package should be BOTTLE, CARTON or PACK")
    private String unit;

    @NotNull(message = "Liczba sztuk nie może być pusta")
    @Min(value = 0, message = "Liczba sztuk nie może być mniejsza od 0")
    @JsonProperty("numberOfUnits")
    private int numberOfUnits;

    @JsonCreator
    public ProductDto(@JsonProperty("id") UUID id,
                      @JsonProperty("name") String name,
                      @JsonProperty("unit") String unit,
                      @JsonProperty("numberOfUnits") int numberOfUnits) {
        this.id = id;
        this.name = name;
        this.unit = unit;
        this.numberOfUnits = numberOfUnits;
    }

    public ProductDto(String name, String unit, int numberOfUnits) {
        this.name = name;
        this.unit = unit;
        this.numberOfUnits = numberOfUnits;
    }
}

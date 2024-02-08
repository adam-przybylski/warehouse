package com.alkoholove.warehouse.dto;

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

    @NotNull(message = "Name cannot be null")
    @Size(min = 1, max = 250, message = "Name should have at least 1 character and maximum 250")
    @JsonProperty("name")
    private String name;

    @JsonProperty("unit")
    @Pattern(regexp = "bottle|carton|pack", message = "Type of package should be BOTTLE, CARTON or PACK")
    private String unit;

    @NotNull(message = "Number of items cannot be null")
    @Min(value = 0, message = "Number of items cannot be negative")
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

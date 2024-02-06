package com.alkoholove.warehouse.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class ProductDto {

    @JsonProperty("id")
    private UUID id;

    @NotNull
    @Size(min = 1, max = 250, message = "Name should have at least 1 character and maximum 250")
    @JsonProperty("name")
    private String name;

    @JsonProperty("typeOfPackage")
    @Pattern(regexp = "bottle|carton|pack", message = "Type of package should be BOTTLE, CARTON or PACK")
    private String typeOfPackage;

    @NotNull
    @Min(value = 0, message = "Number of items cannot be negative")
    @JsonProperty("numberOfItems")
    private int numberOfItems;

    @JsonCreator
    public ProductDto(@JsonProperty("id") UUID id,
                      @JsonProperty("name") String name,
                      @JsonProperty("typeOfPackage") String typeOfPackage,
                      @JsonProperty("numberOfItems") int numberOfItems) {
        this.id = id;
        this.name = name;
        this.typeOfPackage = typeOfPackage;
        this.numberOfItems = numberOfItems;
    }

    public ProductDto(String name, String typeOfPackage, int numberOfItems) {
        this.name = name;
        this.typeOfPackage = typeOfPackage;
        this.numberOfItems = numberOfItems;
    }
}

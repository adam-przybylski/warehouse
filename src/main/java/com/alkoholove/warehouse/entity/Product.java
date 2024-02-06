package com.alkoholove.warehouse.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotBlank;

import java.util.UUID;

@Data
@Entity
@Table(name = "product")
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false, unique = true)
    private UUID id;

    @Column(name = "name", nullable = false, unique = true)
    @NotBlank(message = "Name is manadatory")
    private String name;

    @Column(name = "typeOfPackage", nullable = false)
    @Enumerated(EnumType.STRING)
    private TypeOfPackage typeOfPackage;

    @Column(name = "numberOfItems")
    private int numberOfItems;

    public Product(String name, TypeOfPackage typeOfPackage, int numberOfItems) {
        this.name = name;
        this.typeOfPackage = typeOfPackage;
        this.numberOfItems = numberOfItems;
    }

}

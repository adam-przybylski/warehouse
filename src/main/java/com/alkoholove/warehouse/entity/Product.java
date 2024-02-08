package com.alkoholove.warehouse.entity;

import com.alkoholove.warehouse.enums.PackageType;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;


@Entity
@Table(name = "product")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false, unique = true)
    private UUID id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "packageType", nullable = false)
    @Enumerated(EnumType.STRING)
    private PackageType unit;

    @Column(name = "numberOfItems")
    private int numberOfUnits;

    public Product(String name, PackageType unit, int numberOfUnits) {
        this.name = name;
        this.unit = unit;
        this.numberOfUnits = numberOfUnits;
    }

}

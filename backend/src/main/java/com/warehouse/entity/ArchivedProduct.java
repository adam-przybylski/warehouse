package com.warehouse.entity;

import com.warehouse.enums.PackageType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "archived_product")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ArchivedProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "archived_product_id", nullable = false, unique = true)
    private UUID id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "packageType", nullable = false)
    @Enumerated(EnumType.STRING)
    private PackageType unit;

    @Column(name = "numberOfItems")
    private int numberOfUnits;

    public ArchivedProduct(String name, PackageType unit, int numberOfUnits) {
        this.name = name;
        this.unit = unit;
        this.numberOfUnits = numberOfUnits;
    }

    @Override
    public String toString() {
        return "ArchivedProduct{" +
                ", name='" + name + '\'' +
                ", unit=" + unit +
                ", numberOfUnits=" + numberOfUnits +
                '}';
    }
}

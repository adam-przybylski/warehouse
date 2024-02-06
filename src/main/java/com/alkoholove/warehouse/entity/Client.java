package com.alkoholove.warehouse.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;


@Entity
@Table(name = "client")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false, unique = true)
    private UUID id;

    @Column(name = "name", nullable = false, unique = true)
    @NotBlank(message = "Name is manadatory")
    private String name;

    @Column(name = "city", nullable = false)
    @NotBlank(message = "City is mandatory")
    private String city;

    public Client(String name, String city) {
        this.name = name;
        this.city = city;
    }
}

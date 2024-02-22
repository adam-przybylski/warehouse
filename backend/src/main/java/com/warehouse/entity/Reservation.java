package com.warehouse.entity;

import com.warehouse.enums.DeliveryType;
import com.warehouse.enums.PaymentConfirmation;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "reservation")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false, unique = true)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    @ManyToMany
    @JoinTable(name = "product_reservation",
            joinColumns = @JoinColumn(name = "reservation_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id"))
    private List<ArchivedProduct> products;

    @Column(name = "reservationDate", nullable = false)
    private LocalDate reservationDate;

    @Column(name = "deliveryDate", nullable = false)
    private LocalDate deliveryDate;

    @Column(name = "paymentConfirmation", nullable = false)
    @Enumerated(EnumType.STRING)
    private PaymentConfirmation paymentConfirmation;

    @Column(name = "deliveryType", nullable = false)
    @Enumerated(EnumType.STRING)
    private DeliveryType deliveryType;

    @Column(name = "isDelivered", nullable = false)
    private boolean isDelivered;

    public Reservation(Client client, List<ArchivedProduct> products, LocalDate reservationDate, LocalDate deliveryDate,
                       PaymentConfirmation paymentConfirmation, DeliveryType deliveryType) {
        this.client = client;
        this.products = products;
        this.reservationDate = reservationDate;
        this.deliveryDate = deliveryDate;
        this.paymentConfirmation = paymentConfirmation;
        this.deliveryType = deliveryType;
        this.isDelivered = false;
    }


}

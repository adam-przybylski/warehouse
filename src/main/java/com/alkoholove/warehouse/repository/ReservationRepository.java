package com.alkoholove.warehouse.repository;

import com.alkoholove.warehouse.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, UUID> {

    List<Reservation> findByClientId(UUID clientId);

    Optional<Reservation> findById(UUID id);

    @Query("SELECT r FROM Reservation r WHERE r.isDelivered = :b")
    List<Reservation> findByDelivered(boolean b);
}

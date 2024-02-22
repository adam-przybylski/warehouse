package com.warehouse.repository;

import com.warehouse.entity.ArchivedProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ArchivedProductRepository extends JpaRepository<ArchivedProduct, UUID> {
}

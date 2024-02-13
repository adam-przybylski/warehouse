package com.alkoholove.warehouse.repository;

import com.alkoholove.warehouse.entity.AuthGrantedAuthority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthGrantedAuthorityRepository extends JpaRepository<AuthGrantedAuthority, Long> {
    AuthGrantedAuthority findByAuthority(String authority);
}

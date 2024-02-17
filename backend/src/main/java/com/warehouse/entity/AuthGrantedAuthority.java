package com.warehouse.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AuthGrantedAuthority implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "authority", nullable = false)
    private String authority;

    public AuthGrantedAuthority(String admin) {
        this.authority = admin;
    }

}

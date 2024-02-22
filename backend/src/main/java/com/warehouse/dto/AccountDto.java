package com.warehouse.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Data
public class AccountDto implements UserDetails {

    @JsonProperty("id")
    private UUID id;

    @JsonProperty("username")
    @Size(min = 6, max = 20, message = "Nazwa użytkownika musi mieć od 6 do 20 znaków.")
    private String username;

    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
            message = "Hasło musi zawierać co najmniej jedną małą literę, jedną dużą literę, jedną cyfrę, jeden znak specjalny i mieć co najmniej 8 znaków."
    )
    private String password;

    @JsonProperty("role")
    @Pattern(regexp = "USER|ADMIN|VIEWER", message = "Role should be USER, ADMIN or VIEWER")
    private String role;

    @JsonProperty("enabled")
    private boolean enabled;

    @JsonCreator
    public AccountDto(@JsonProperty("username") String username,
                      @JsonProperty("password") String password,
                      @JsonProperty("role") String role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public AccountDto(UUID id, String username, String role, boolean enabled) {
        this.id = id;
        this.username = username;
        this.role = role;
        this.enabled = enabled;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}

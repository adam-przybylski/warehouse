package com.alkoholove.warehouse.service;

import com.alkoholove.warehouse.dto.AuthenticationDto;
import com.alkoholove.warehouse.exceptions.ResourceNotFoundException;
import com.alkoholove.warehouse.repository.AccountRepository;
import com.alkoholove.warehouse.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AccountRepository accountRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;


    public String authenticate(AuthenticationDto authenticationDto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationDto.getUsername(),
                        authenticationDto.getPassword()
                )
        );

        var account = accountRepository.findByUsername(authenticationDto.getUsername());

        return  "Bearer " + jwtService.generateToken(account);
    }
}

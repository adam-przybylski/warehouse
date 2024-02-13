package com.alkoholove.warehouse.controller;

import com.alkoholove.warehouse.dto.AuthenticationDto;
import com.alkoholove.warehouse.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/authenticate")
    public String authenticate(@RequestBody AuthenticationDto authenticationDto) {
        return authenticationService.authenticate(authenticationDto);
    }


}

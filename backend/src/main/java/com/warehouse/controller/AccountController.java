package com.warehouse.controller;


import com.warehouse.dto.AccountDto;
import com.warehouse.dto.AuthenticationDto;
import com.warehouse.service.AccountService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/accounts")
@Validated
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @GetMapping(value = "{username}", produces = "application/json")
    public AccountDto getAccountByUsername(@PathVariable String username) {
        return accountService.findByUsername(username);
    }

    @GetMapping(produces = "application/json")
    public List<AccountDto> getAccounts() {
        return accountService.getAccounts();
    }

    @PatchMapping(value = "enable/{username}", produces = "application/json")
    public AccountDto enableAccount(@PathVariable String username) {
        return accountService.enableAccount(username);
    }

    @PatchMapping(value = "disable/{username}", produces = "application/json")
    public AccountDto disableAccount(@PathVariable String username) {
        return accountService.disableAccount(username);
    }

    @PutMapping(value = "{username}", produces = "application/json", consumes = "application/json")
    public AccountDto updatePassword(@PathVariable String username, @RequestBody @Valid AuthenticationDto authenticationDto) {
        return accountService.updatePassword(username, authenticationDto);
    }

    @PostMapping(produces = "application/json", consumes = "application/json")
    public AccountDto addAccount(@RequestBody @Valid AccountDto accountDto) {
        return accountService.addAccount(accountDto);
    }

}

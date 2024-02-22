package com.warehouse.service;

import com.warehouse.dto.AccountDto;
import com.warehouse.dto.AuthenticationDto;
import com.warehouse.entity.Account;
import com.warehouse.entity.AuthGrantedAuthority;
import com.warehouse.repository.AccountRepository;
import com.warehouse.repository.AuthGrantedAuthorityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;

    private final AuthGrantedAuthorityRepository authGrantedAuthorityRepository;

    private final PasswordEncoder passwordEncoder;

    public AccountDto findByUsername(String username) {
        Account account = accountRepository.findByUsername(username);
        if (account == null) {
            throw new IllegalArgumentException("Konto z podaną nazwą użytkownika nie istnieje");
        }
        return new AccountDto(account.getId(),account.getUsername(), account.getAuthority().getAuthority(), account.isEnabled());
    }

    public List<AccountDto> getAccounts() {
        List<Account> accounts = accountRepository.findAll();
        List<AccountDto> accountDtos = new ArrayList<>();
        for (Account account : accounts) {
            accountDtos.add(new AccountDto(account.getId(), account.getUsername(), account.getAuthority().getAuthority(), account.isEnabled()));
        }
        return accountDtos;
    }

    public AccountDto addAccount(AccountDto accountDto) {
        Account existingAccount = accountRepository.findByUsername(accountDto.getUsername());
        if (existingAccount != null) {
            throw new IllegalArgumentException("Konto z podaną nazwą użytkownika już istnieje");
        }
        AuthGrantedAuthority authority = authGrantedAuthorityRepository.findByAuthority(accountDto.getRole());
        Account account = new Account(accountDto.getUsername(), passwordEncoder.encode(accountDto.getPassword()), authority, true);
        accountRepository.save(account);
        return findByUsername(account.getUsername());
    }


    public AccountDto enableAccount(String username) {
        Account account = accountRepository.findByUsername(username);
        if (account == null) {
            throw new IllegalArgumentException("Konto z podaną nazwą użytkownika nie istnieje");
        }
        account.setEnabled(true);
        accountRepository.save(account);
        return findByUsername(username);
    }

    public AccountDto disableAccount(String username) {
        Account account = accountRepository.findByUsername(username);
        if (account == null) {
            throw new IllegalArgumentException("Konto z podaną nazwą użytkownika nie istnieje");
        }
        account.setEnabled(false);
        accountRepository.save(account);
        return findByUsername(username);
    }

    public AccountDto updatePassword(String username, AuthenticationDto authenticationDto) {
        Account account = accountRepository.findByUsername(username);
        if (account == null) {
            throw new IllegalArgumentException("Konto z podaną nazwą użytkownika nie istnieje");
        }
        account.setPassword(passwordEncoder.encode(authenticationDto.getPassword()));
        accountRepository.save(account);
        return findByUsername(username);
    }
}

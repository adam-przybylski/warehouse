package com.warehouse.controller;

import com.warehouse.dto.ClientDto;
import com.warehouse.entity.Client;
import com.warehouse.service.ClientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/clients")
@Validated
@RequiredArgsConstructor
public class ClientController {
    private final ClientService clientService;

    @GetMapping(produces = "application/json")
    public List<Client> getAllClients() {
        return clientService.getAllClients();
    }

    @GetMapping(value = "{name}", produces = "application/json")
    public Client getClientByName(@PathVariable String name) {
        return clientService.getClientByName(name);
    }

    @PostMapping(produces = "application/json", consumes = "application/json")
    public Client addClient(@RequestBody @Valid ClientDto clientDto) {
        return clientService.addClient(clientDto);
    }

    @DeleteMapping(value = "{name}")
    public void deleteClient(@PathVariable String name) {
        clientService.deleteClient(name);
    }

}

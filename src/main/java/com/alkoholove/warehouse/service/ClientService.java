package com.alkoholove.warehouse.service;

import com.alkoholove.warehouse.dto.ClientDto;
import com.alkoholove.warehouse.entity.Client;
import com.alkoholove.warehouse.exceptions.ResourceNotFoundException;
import com.alkoholove.warehouse.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ClientService {
    private final ClientRepository clientRepository;

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public Client getClientByName(String name) {
        return clientRepository.findByName(name).orElseThrow(() -> new ResourceNotFoundException("Client with name " + name + " not found"));
    }

    public Client addClient(ClientDto clientDto) {
        Client client = new Client(clientDto.getName(), clientDto.getCity());
        clientRepository.save(client);
        return getClientByName(clientDto.getName());
    }

    public Client deleteClient(String name) {
        Client client = getClientByName(name);
        clientRepository.delete(client);
        return client;
    }
}

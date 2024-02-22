package com.warehouse.service;

import com.warehouse.dto.ClientDto;
import com.warehouse.entity.Client;
import com.warehouse.exceptions.ResourceNotFoundException;
import com.warehouse.repository.ClientRepository;
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
        return clientRepository.findByName(name).orElseThrow(() -> new ResourceNotFoundException("Klient o nazwie " + name + " nie istnieje"));
    }

    public Client addClient(ClientDto clientDto) {
        Client client = new Client(clientDto.getName(), clientDto.getCity());
        if(clientRepository.findByName(clientDto.getName()).isPresent()) {
            throw new IllegalArgumentException("Klient o podanej nazwie już istnieje");
        }
        clientRepository.save(client);
        return getClientByName(clientDto.getName());
    }

    public Client deleteClient(String name) {
        Client client = getClientByName(name);
        clientRepository.delete(client);
        return client;
    }
}

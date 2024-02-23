package com.warehouse.service;

import com.warehouse.dto.ClientDto;
import com.warehouse.entity.Client;
import com.warehouse.exceptions.ResourceNotFoundException;
import com.warehouse.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ClientService {
    private final ClientRepository clientRepository;
    private static final Logger logger = LoggerFactory.getLogger(ClientService.class);

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public Client getClientByName(String name) {
        return clientRepository.findByName(name).orElseThrow(() -> new ResourceNotFoundException("Klient o nazwie " + name + " nie istnieje"));
    }

    public Client addClient(ClientDto clientDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Client client = new Client(clientDto.getName(), clientDto.getCity());
        if(clientRepository.findByName(clientDto.getName()).isPresent()) {
            throw new IllegalArgumentException("Klient o podanej nazwie już istnieje");
        }
        clientRepository.save(client);
        logger.info("Klient o nazwie " + clientDto.getName() + " został dodany przez " + authentication.getName());
        return getClientByName(clientDto.getName());
    }

    public void deleteClient(String name) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Client client = getClientByName(name);
        clientRepository.delete(client);
        logger.info("Klient o nazwie " + name + " został usunięty przez " + authentication.getName());
    }
}

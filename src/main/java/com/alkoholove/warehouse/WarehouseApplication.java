package com.alkoholove.warehouse;

import com.alkoholove.warehouse.entity.Client;
import com.alkoholove.warehouse.entity.Product;
import com.alkoholove.warehouse.entity.Reservation;
import com.alkoholove.warehouse.enums.DeliveryType;
import com.alkoholove.warehouse.enums.PackageType;
import com.alkoholove.warehouse.enums.PaymentConfirmation;
import com.alkoholove.warehouse.repository.ClientRepository;
import com.alkoholove.warehouse.repository.ProductRepository;
import com.alkoholove.warehouse.repository.ReservationRepository;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;
import java.util.List;

@SpringBootApplication
public class WarehouseApplication {

    public static void main(String[] args) {

        Dotenv dotenv = Dotenv.configure().load();

        System.setProperty("spring.datasource.url", dotenv.get("DB_URL"));
        System.setProperty("spring.datasource.username", dotenv.get("DB_USERNAME"));
        System.setProperty("spring.datasource.password", dotenv.get("DB_PASSWORD"));

        SpringApplication.run(WarehouseApplication.class, args);
    }

//    @Bean
//    CommandLineRunner runner(ClientRepository clientRepository, ProductRepository productRepository, ReservationRepository reservationRepository) {
//        return args -> {
//            Product product1 = new Product("Vodka", PackageType.BOTTLE, 40);
//            productRepository.save(product1);
//            Client client1 = new Client("John", "New York");
//            clientRepository.save(client1);
//            Reservation reservation1 = new Reservation(client1, List.of(product1), LocalDateTime.now(), LocalDateTime.now(), PaymentConfirmation.INVOICE, DeliveryType.DELIVERY);
//            reservationRepository.save(reservation1);
//        };
//    }


}

package com.alkoholove.warehouse;

import com.alkoholove.warehouse.entity.Product;
import com.alkoholove.warehouse.entity.TypeOfPackage;
import com.alkoholove.warehouse.repository.ProductRepository;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class WarehouseApplication {

    public static void main(String[] args) {

        Dotenv dotenv = Dotenv.configure().load();

        System.setProperty("spring.datasource.url", dotenv.get("DB_URL"));
        System.setProperty("spring.datasource.username", dotenv.get("DB_USERNAME"));
        System.setProperty("spring.datasource.password", dotenv.get("DB_PASSWORD"));

        SpringApplication.run(WarehouseApplication.class, args);
    }


}

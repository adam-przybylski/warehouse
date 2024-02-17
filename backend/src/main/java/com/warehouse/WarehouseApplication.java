package com.warehouse;

import com.warehouse.entity.Account;
import com.warehouse.entity.AuthGrantedAuthority;
import com.warehouse.repository.AccountRepository;
import com.warehouse.repository.AuthGrantedAuthorityRepository;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class WarehouseApplication {

    public static void main(String[] args) {

        Dotenv dotenv = Dotenv.configure().load();

        System.setProperty("spring.datasource.url", dotenv.get("DB_URL"));
        System.setProperty("spring.datasource.username", dotenv.get("DB_USERNAME"));
        System.setProperty("spring.datasource.password", dotenv.get("DB_PASSWORD"));
        System.setProperty("secret_key", dotenv.get("SECRET_KEY"));
        System.setProperty("server.ssl.key-store-password", dotenv.get("SSL_KEYSTORE_PASSWORD"));
        System.setProperty("server.ssl.key-store", dotenv.get("SSL_KEYSTORE"));
        System.setProperty("server.ssl.key-password", dotenv.get("SSL_KEY_PASSWORD"));
        System.setProperty("frontend_url", dotenv.get("FRONTEND_URL"));


        SpringApplication.run(WarehouseApplication.class, args);
    }

    @Bean
    CommandLineRunner runner(AccountRepository accountRepository, AuthGrantedAuthorityRepository authGrantedAuthorityRepository) {
        return args -> {
            AuthGrantedAuthority admin = new AuthGrantedAuthority("ADMIN");
            AuthGrantedAuthority user = new AuthGrantedAuthority("USER");
            AuthGrantedAuthority viewer = new AuthGrantedAuthority("VIEWER");
            authGrantedAuthorityRepository.saveAll(List.of(admin, user, viewer));
            Account account = new Account("testAdmin", "$2a$10$tVNnxTpsEkn0iKeEvtbMVeQTCAJYxp7e0ZY.yq3UhXle6dUmi.F.i", admin, true);
            Account account1 = new Account("testUser", "$2a$10$tVNnxTpsEkn0iKeEvtbMVeQTCAJYxp7e0ZY.yq3UhXle6dUmi.F.i", user, true);
            Account account2 = new Account("viewer", "$2a$10$tVNnxTpsEkn0iKeEvtbMVeQTCAJYxp7e0ZY.yq3UhXle6dUmi.F.i", viewer, true);
            accountRepository.save(account);
            accountRepository.save(account1);
            accountRepository.save(account2);
        };
    }


}

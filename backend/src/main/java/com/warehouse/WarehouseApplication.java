package com.warehouse;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class WarehouseApplication {

    public static void main(String[] args) {

        loadEnvironmentVariables();

        SpringApplication.run(WarehouseApplication.class, args);
    }

    public static void loadEnvironmentVariables() {
        Dotenv dotenv = Dotenv.configure().load();

        System.setProperty("spring.datasource.url", dotenv.get("DB_URL"));
        System.setProperty("spring.datasource.username", dotenv.get("DB_USERNAME"));
        System.setProperty("spring.datasource.password", dotenv.get("DB_PASSWORD"));
        System.setProperty("SECRET_KEY", dotenv.get("SECRET_KEY"));
        System.setProperty("FRONTEND_URL", dotenv.get("FRONTEND_URL"));
        System.setProperty("server.port", dotenv.get("BACKEND_PORT"));
        System.setProperty("server.address", dotenv.get("BACKEND_ADDRESS"));

        String loggingFilePath = dotenv.get("LOGGING_FILE_PATH");
        if (loggingFilePath != null) {
            System.setProperty("logging.file.path", loggingFilePath);
        }

        String loggingFileName = dotenv.get("LOGGING_FILE_NAME");
        if (loggingFileName != null) {
            System.setProperty("logging.file.name", loggingFileName);
        }


        String keystorePassword = dotenv.get("SSL_KEYSTORE_PASSWORD");
        if (keystorePassword != null) {
            System.setProperty("server.ssl.key-store-password", keystorePassword);
        }

        String keystore = dotenv.get("SSL_KEYSTORE");
        if (keystore != null) {
            System.setProperty("server.ssl.key-store", keystore);
        }

        String sslEnabled = dotenv.get("SSL_ENABLED");
        if (sslEnabled != null) {
            System.setProperty("server.ssl.enabled", sslEnabled);
        }

        String sslKeyStoreType = dotenv.get("SSL_KEYSTORE_TYPE");
        if (sslKeyStoreType != null) {
            System.setProperty("server.ssl.key-store-type", sslKeyStoreType);
        }

        String sslKeyAlias = dotenv.get("SSL_KEY_ALIAS");
        if (sslKeyAlias != null) {
            System.setProperty("server.ssl.key-alias", sslKeyAlias);
        }
    }

}

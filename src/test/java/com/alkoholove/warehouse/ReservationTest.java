package com.alkoholove.warehouse;

import com.alkoholove.warehouse.dto.ClientDto;
import com.alkoholove.warehouse.dto.ProductDto;
import com.alkoholove.warehouse.enums.PackageType;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;

import java.util.List;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.containsString;


public class ReservationTest {

    private final String reservationUrl = "http://localhost:8081/api/v1/reservations";

    private final String productUrl = "http://localhost:8081/api/v1/products";

    private final String clientUrl = "http://localhost:8081/api/v1/clients";


    @Test
    public void addReservationsTest() {
        ClientDto client1 = new ClientDto("Chuj", "New York");
        ProductDto product1 = new ProductDto("Wine", "bottle", 40);

        JSONObject clientJson = new JSONObject();
        clientJson.put("name", client1.getName());
        clientJson.put("city", client1.getCity());

        JSONObject productJson = new JSONObject();
        productJson.put("name", product1.getName());
        productJson.put("unit", product1.getUnit());
        productJson.put("numberOfUnits", product1.getNumberOfUnits());

        JSONObject reservationJson = new JSONObject();
        reservationJson.put("clientName", client1.getName());
        reservationJson.put("products", List.of(product1));
        reservationJson.put("deliveryDate", "2025-10-10T10:00:00");
        reservationJson.put("paymentConfirmation", "invoice");
        reservationJson.put("deliveryType", "delivery");

        given()
                .contentType("application/json")
                .body(clientJson.toString())
                .when()
                .post(clientUrl)
                .then()
                .statusCode(200);

        given()
                .contentType("application/json")
                .body(productJson.toString())
                .when()
                .post(productUrl)
                .then()
                .statusCode(200);

        given()
                .contentType("application/json")
                .body(reservationJson.toString())
                .when()
                .post(reservationUrl)
                .then()
                .statusCode(200)
                .body(containsString("Chuj"));


    }


}

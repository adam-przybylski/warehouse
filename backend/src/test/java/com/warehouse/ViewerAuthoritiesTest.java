package com.warehouse;

import com.warehouse.dto.ProductDto;
import io.github.cdimascio.dotenv.Dotenv;
import io.restassured.response.Response;
import org.json.JSONObject;
import org.junit.jupiter.api.*;

import java.util.List;

import static io.restassured.RestAssured.given;


@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class ViewerAuthoritiesTest {

    private final String reservationUrl = "http://localhost:8081/api/v1/reservations";

    private final String productUrl = "http://localhost:8081/api/v1/products";

    private final String clientUrl = "http://localhost:8081/api/v1/clients";

    private final String accountUrl = "http://localhost:8081/api/v1/accounts";

    private static String token;


    @BeforeAll
    public static void setUp() {
        Dotenv dotenv = Dotenv.configure().load();
        String password = dotenv.get("TEST_PASSWORD");

        Response response = given()
                .contentType("application/json")
                .body("{\"username\":\"viewer\",\"password\":\"" + password + "\"}")
                .when()
                .post("http://localhost:8081/api/v1/auth/authenticate");

        token = response.asString();
    }

    @Test
    @Order(1)
    public void testGetReservations() {
        given()
                .header("Authorization", token)
                .when()
                .get(reservationUrl)
                .then()
                .statusCode(200);
    }

    @Test
    @Order(2)
    public void testGetProducts() {
        given()
                .header("Authorization", token)
                .when()
                .get(productUrl)
                .then()
                .statusCode(200);
    }

    @Test
    @Order(3)
    public void testGetClients() {
        given()
                .header("Authorization", token)
                .when()
                .get(clientUrl)
                .then()
                .statusCode(200);
    }

    @Test
    @Order(4)
    public void testGetAllAccounts() {
        given()
                .header("Authorization", token)
                .when()
                .get(accountUrl)
                .then()
                .statusCode(403);
    }

    @Test
    @Order(5)
    public void testGetViewerAccount() {
        given()
                .header("Authorization", token)
                .when()
                .get(accountUrl + "/viewer")
                .then()
                .statusCode(200);
    }

    @Test
    @Order(6)
    public void testGetOtherAccount() {
        given()
                .header("Authorization", token)
                .when()
                .get(accountUrl + "/user")
                .then()
                .statusCode(403);
    }

    @Test
    @Order(7)
    public void testAddAccount() {
        given()
                .header("Authorization", token)
                .contentType("application/json")
                .body("{\"username\":\"testAcc\",\"password\":\"Test1234!\",\"role\":\"USER\"}")
                .when()
                .post(accountUrl)
                .then()
                .statusCode(403);
    }

    @Test
    @Order(8)
    public void testUpdateViewerPassword() {
        given()
                .header("Authorization", token)
                .contentType("application/json")
                .body("{\"username\":\"viewer\",\"password\":\"Test1234!\"}")
                .when()
                .put(accountUrl + "/viewer")
                .then()
                .statusCode(200);
    }

    @Test
    @Order(9)
    public void testUpdateOtherAccountPassword() {
        given()
                .header("Authorization", token)
                .contentType("application/json")
                .body("{\"username\":\"user\",\"password\":\"Test1234!\"}")
                .when()
                .put(accountUrl + "/user")
                .then()
                .statusCode(403);
    }

    @Test
    @Order(10)
    public void testDisableViewerAccount() {
        given()
                .header("Authorization", token)
                .when()
                .patch(accountUrl + "/enable/user")
                .then()
                .statusCode(403);
    }

    @Test
    @Order(11)
    public void testAddProduct() {
        given()
                .header("Authorization", token)
                .contentType("application/json")
                .body("{\"name\":\"testProduct\",\"unit\":\"bottle\",\"numberOfUnits\":10}")
                .when()
                .post(productUrl)
                .then()
                .statusCode(403);
    }

    @Test
    @Order(12)
    public void testAddClient() {
        given()
                .header("Authorization", token)
                .contentType("application/json")
                .body("{\"name\": \"testClient\", \"city\": \"testCity\"}")
                .when()
                .post(clientUrl)
                .then()
                .statusCode(403);
    }

    @Test
    @Order(13)
    public void testAddReservation() {
        ProductDto product = new ProductDto("testProduct", "bottle", 5);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("clientName", "testClient");
        jsonObject.put("products", List.of(product));
        jsonObject.put("deliveryDate", "2025-12-12T12:12:12");
        jsonObject.put("paymentConfirmation", "invoice");

        given()
                .header("Authorization", token)
                .contentType("application/json")
                .body(jsonObject.toString())
                .when()
                .post(reservationUrl)
                .then()
                .statusCode(403);
    }

    @Test
    @Order(14)
    public void testUpdateProduct() {
        given()
                .header("Authorization", token)
                .contentType("application/json")
                .body("{\"name\":\"testProduct\",\"unit\":\"bottle\",\"numberOfUnits\":10}")
                .when()
                .put(productUrl + "/testProduct")
                .then()
                .statusCode(403);
    }





}

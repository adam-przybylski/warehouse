package com.warehouse.enums;

public enum DeliveryType {

    DELIVERY("delivery"),

    SHIPMENT("shipment");

    private final String label;

    DeliveryType(String label) {
        this.label = label;
    }

}

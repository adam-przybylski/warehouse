package com.alkoholove.warehouse.enums;

public enum PaymentConfirmation {
    RECEIPT("receipt"),

    INVOICE("invoice");

    public final String label;

    private PaymentConfirmation(String label){
        this.label = label;
    }
}

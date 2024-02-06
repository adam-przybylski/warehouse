package com.alkoholove.warehouse.entity;

public enum TypeOfPackage {
    BOTTLE("bottle"),
    PACK("pack"),
    CARTON("carton");

    public final String label;

    private TypeOfPackage(String label){
        this.label = label;
    }

}

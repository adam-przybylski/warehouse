package com.warehouse.enums;

public enum PackageType {
    BOTTLE("bottle"),
    PACK("pack"),
    CARTON("carton");

    public final String label;

    private PackageType(String label){
        this.label = label;
    }

}

package com.cvssv3.calculator.enums.BaseMetrics;

public enum PrivilegesRequiredU {
    N("None", 0.85),
    L("Low", 0.62),
    H("High",0.27);

    private final String description;
    private final Double value;

    PrivilegesRequiredU(String description, Double value) {
        this.description = description;
        this.value = value;
    }

    public String getDescription() {
        return description;
    }

    public Double getValue() {
        return value;
    }
}

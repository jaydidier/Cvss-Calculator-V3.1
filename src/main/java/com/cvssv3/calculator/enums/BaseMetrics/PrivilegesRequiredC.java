package com.cvssv3.calculator.enums.BaseMetrics;

public enum PrivilegesRequiredC {
    N("None", 0.85),
    L("Low", 0.68),
    H("High", 0.5);

    private final String description;
    private final Double value;

    PrivilegesRequiredC(String description, Double value) {
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

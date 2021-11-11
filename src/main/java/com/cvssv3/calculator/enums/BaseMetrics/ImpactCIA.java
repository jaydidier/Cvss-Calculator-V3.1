package com.cvssv3.calculator.enums.BaseMetrics;

public enum ImpactCIA {
    N("None", 0.0),
    L("Low", 0.22),
    H("High", 0.56);

    private final String description;
    private final Double value;


    ImpactCIA(String description, Double value) {
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

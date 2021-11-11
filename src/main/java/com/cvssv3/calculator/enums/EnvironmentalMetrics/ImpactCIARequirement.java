package com.cvssv3.calculator.enums.EnvironmentalMetrics;

public enum ImpactCIARequirement {
    X("Not Defined", 1.0),
    H("High", 1.5),
    M("Medium", 1.0),
    L("Low", 0.5);

    private final String description;
    private final Double value;

    ImpactCIARequirement(String description, Double value) {
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

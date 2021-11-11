package com.cvssv3.calculator.enums.BaseMetrics;

public enum AttackComplexity {
    L("Low",0.77),
    H("High", 0.44);

    private final String description;
    private final Double value;

    AttackComplexity(String description, Double value) {
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

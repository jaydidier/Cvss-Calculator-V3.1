package com.cvssv3.calculator.enums.BaseMetrics;

public enum AttackVector {
    N("Network", 0.85),
    A("Adjacent",0.62),
    L("Local", 0.55),
    P("Physical", 0.2);

    private final String description;
    private final Double value;

    AttackVector(String description, Double value) {
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

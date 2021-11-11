package com.cvssv3.calculator.enums.TemporalMetrics;

public enum RemediationLevel {
    X("Not Defined", 1.0),
    U("Unavailable", 1.0),
    W("Workaround", 0.97),
    T("Temporal Fix", 0.96),
    O("Official Fix", 0.95);

    private final String description;
    private final Double value;

    RemediationLevel(String description, Double value) {
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

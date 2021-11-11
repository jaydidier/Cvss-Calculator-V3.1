package com.cvssv3.calculator.enums.TemporalMetrics;

public enum ReportConfidence {
    X("Not Defined", 1.0),
    C("Confirmed", 1.0),
    R("Reasonable", 0.96),
    U("Unknown",  0.92);

    private final String description;
    private final Double value;

    ReportConfidence(String description, Double value) {
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

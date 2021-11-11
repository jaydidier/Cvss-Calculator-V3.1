package com.cvssv3.calculator.enums.BaseMetrics;

public enum UserInteraction {
    N("None", 0.85),
    R("Required",0.62);

    private final String description;
    private final Double value;

    UserInteraction(final String description,final Double value) {
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

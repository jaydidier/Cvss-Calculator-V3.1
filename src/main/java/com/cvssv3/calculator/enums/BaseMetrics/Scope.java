package com.cvssv3.calculator.enums.BaseMetrics;

public enum Scope {
    U("Unchanged", 6.42),
    C("Changed", 7.52);

    private final String description;
    private final Double value;

    Scope(final String description, final Double value) {
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

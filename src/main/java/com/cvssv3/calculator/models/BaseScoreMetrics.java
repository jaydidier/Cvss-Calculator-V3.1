package com.cvssv3.calculator.models;

import com.cvssv3.calculator.enums.BaseMetrics.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Getter
@Setter
@NoArgsConstructor
public class BaseScoreMetrics {

    // Exploitability Metrics
    @Enumerated(EnumType.STRING)
    private AttackVector attackVector;

    @Enumerated(EnumType.STRING)
    private AttackComplexity attackComplexity;

    @Enumerated(EnumType.STRING)
    private UserInteraction userInteraction;

    @Enumerated(EnumType.STRING)
    private PrivilegesRequiredU privilegesRequiredU; // privileges required metric with Scope = UNCHANGED

    @Enumerated(EnumType.STRING)
    private PrivilegesRequiredC privilegesRequiredC; // privileges required metric with Scope = CHANGED

    // Impact Metrics
    @Enumerated(EnumType.STRING)
    private ImpactCIA confidentialityImpact;

    @Enumerated(EnumType.STRING)
    private ImpactCIA integrityImpact;

    @Enumerated(EnumType.STRING)
    private ImpactCIA availabilityImpact;

    @Enumerated(EnumType.STRING)
    private Scope scope;

    private Double baseScore;
    private Double impact;
    private Double exploitability;
    private String rate;
}

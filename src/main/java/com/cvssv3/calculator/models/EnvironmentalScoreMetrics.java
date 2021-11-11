package com.cvssv3.calculator.models;

import com.cvssv3.calculator.enums.BaseMetrics.*;
import com.cvssv3.calculator.enums.EnvironmentalMetrics.ImpactCIARequirement;
import com.cvssv3.calculator.enums.TemporalMetrics.ExploitCodeMaturity;
import com.cvssv3.calculator.enums.TemporalMetrics.RemediationLevel;
import com.cvssv3.calculator.enums.TemporalMetrics.ReportConfidence;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Getter
@Setter
@NoArgsConstructor
public class EnvironmentalScoreMetrics {

    // Exploitability Modified Metrics

    @Enumerated(EnumType.STRING)
    private AttackVector modAttackVector;

    @Enumerated(EnumType.STRING)
    private AttackComplexity modAttackComplexity;

    @Enumerated(EnumType.STRING)
    private UserInteraction modUserInteraction;

    @Enumerated(EnumType.STRING)
    private PrivilegesRequiredU modPrivilegesRequiredU;  // privileges required modified metric with Scope = UNCHANGED

    @Enumerated(EnumType.STRING)
    private PrivilegesRequiredC modPrivilegesRequiredC;  // privileges required modified metric with Scope = CHANGED

    // Impact Modified Metrics

    @Enumerated(EnumType.STRING)
    private ImpactCIA modConfidentialityImpact;

    @Enumerated(EnumType.STRING)
    private ImpactCIA modIntegrityImpact;

    @Enumerated(EnumType.STRING)
    private ImpactCIA modAvailabilityImpact;

    // Impact SubScore Modifiers

    @Enumerated(EnumType.STRING)
    private ImpactCIARequirement confidentialityRequirement;

    @Enumerated(EnumType.STRING)
    private ImpactCIARequirement integrityRequirement;

    @Enumerated(EnumType.STRING)
    private ImpactCIARequirement availabilityRequirement;

    @Enumerated(EnumType.STRING)
    private Scope modScope;

    // Environmental Score depends also on Temporal Metrics
    @Enumerated(EnumType.STRING)
    private ExploitCodeMaturity exploitCodeMaturity;

    @Enumerated(EnumType.STRING)
    private RemediationLevel remediationLevel;

    @Enumerated(EnumType.STRING)
    private ReportConfidence reportConfidence;

    private Double environmentalScore;
    private Double modifiedImpact;
    private Double modifiedExploitability;
    private String rate;

    @Override
    public String toString() {
        return "EnvironmentalScoreMetrics{" +
                "modAttackVector=" + modAttackVector +
                ", modAttackComplexity=" + modAttackComplexity +
                ", modUserInteraction=" + modUserInteraction +
                ", modPrivilegesRequiredU=" + modPrivilegesRequiredU +
                ", modPrivilegesRequiredC=" + modPrivilegesRequiredC +
                ", modConfidentialityImpact=" + modConfidentialityImpact +
                ", modIntegrityImpact=" + modIntegrityImpact +
                ", modAvailabilityImpact=" + modAvailabilityImpact +
                ", confidentialityRequirement=" + confidentialityRequirement +
                ", integrityRequirement=" + integrityRequirement +
                ", availabilityRequirement=" + availabilityRequirement +
                ", modScope=" + modScope +
                ", exploitCodeMaturity=" + exploitCodeMaturity +
                ", remediationLevel=" + remediationLevel +
                ", reportConfidence=" + reportConfidence +
                ", environmentalScore=" + environmentalScore +
                ", modifiedImpact=" + modifiedImpact +
                ", modifiedExploitability=" + modifiedExploitability +
                ", rate='" + rate + '\'' +
                '}';
    }
}

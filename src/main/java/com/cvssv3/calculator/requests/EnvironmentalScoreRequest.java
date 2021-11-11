package com.cvssv3.calculator.requests;

import com.cvssv3.calculator.enums.BaseMetrics.*;
import com.cvssv3.calculator.enums.EnvironmentalMetrics.ImpactCIARequirement;
import com.cvssv3.calculator.enums.TemporalMetrics.ExploitCodeMaturity;
import com.cvssv3.calculator.enums.TemporalMetrics.RemediationLevel;
import com.cvssv3.calculator.enums.TemporalMetrics.ReportConfidence;
import com.cvssv3.calculator.models.EnvironmentalScoreMetrics;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EnvironmentalScoreRequest {

    // Exploitability Metrics

    private String MAV;             // Modified Attack Vector
    private String MAC;             // Modified Attack Complexity
    private String MPR;             // Modified Privileges Required
    private String MUI;             // Modified User Interaction

    // Impact Metrics

    private String MC;              // Modified Confidentiality Impact
    private String MI;              // Modified Integrity Impact
    private String MA;              // Modified Availability Impact

    // Impact Subscore Modifiers

    private String CR;              // Confidentiality Requirement
    private String IR;              // Integrity Requirement
    private String AR;              // Availability Requirement

    private String MS;              // Modified Scope

    private String exploitCodeMaturity;     // Environmental Score depends on Temporal Metrics
    private String remediationLevel;
    private String reportConfidence;

    public EnvironmentalScoreRequest(String MAV, String MAC, String MPR, String MUI, String MC, String MI, String MA, String CR, String IR, String AR, String MS, String exploitCodeMaturity, String remediationLevel, String reportConfidence) {
        this.MAV = MAV;
        this.MAC = MAC;
        this.MPR = MPR;
        this.MUI = MUI;
        this.MC = MC;
        this.MI = MI;
        this.MA = MA;
        this.CR = CR;
        this.IR = IR;
        this.AR = AR;
        this.MS = MS;
        this.exploitCodeMaturity = exploitCodeMaturity;
        this.remediationLevel = remediationLevel;
        this.reportConfidence = reportConfidence;
    }

    @Override
    public String toString() {
        return "EnvironmentalScoreRequest{" +
                "MAV='" + MAV + '\'' +
                ", MAC='" + MAC + '\'' +
                ", MPR='" + MPR + '\'' +
                ", MUI='" + MUI + '\'' +
                ", MC='" + MC + '\'' +
                ", MI='" + MI + '\'' +
                ", MA='" + MA + '\'' +
                ", CR='" + CR + '\'' +
                ", IR='" + IR + '\'' +
                ", AR='" + AR + '\'' +
                ", MS='" + MS + '\'' +
                ", exploitCodeMaturity='" + exploitCodeMaturity + '\'' +
                ", remediationLevel='" + remediationLevel + '\'' +
                ", reportConfidence='" + reportConfidence + '\'' +
                '}';
    }

    public EnvironmentalScoreMetrics toModel() {

        EnvironmentalScoreMetrics environmentalScoreMetrics = new EnvironmentalScoreMetrics();

        environmentalScoreMetrics.setModAttackVector(AttackVector.valueOf(getMAV()));
        environmentalScoreMetrics.setModAttackComplexity(AttackComplexity.valueOf(getMAC()));
        environmentalScoreMetrics.setModUserInteraction(UserInteraction.valueOf(getMUI()));
        environmentalScoreMetrics.setModScope(Scope.valueOf(getMS()));
        environmentalScoreMetrics.setModConfidentialityImpact(ImpactCIA.valueOf(getMC()));
        environmentalScoreMetrics.setModIntegrityImpact(ImpactCIA.valueOf(getMI()));
        environmentalScoreMetrics.setModAvailabilityImpact(ImpactCIA.valueOf(getMA()));
        environmentalScoreMetrics.setConfidentialityRequirement(ImpactCIARequirement.valueOf(getCR()));
        environmentalScoreMetrics.setIntegrityRequirement(ImpactCIARequirement.valueOf(getIR()));
        environmentalScoreMetrics.setAvailabilityRequirement(ImpactCIARequirement.valueOf(getAR()));
        environmentalScoreMetrics.setExploitCodeMaturity(ExploitCodeMaturity.valueOf(getExploitCodeMaturity()));
        environmentalScoreMetrics.setRemediationLevel(RemediationLevel.valueOf(getRemediationLevel()));
        environmentalScoreMetrics.setReportConfidence(ReportConfidence.valueOf(getReportConfidence()));

        if (getMS().equals("U")) { // Scope = UNCHANGED
            environmentalScoreMetrics.setModPrivilegesRequiredU(PrivilegesRequiredU.valueOf(getMPR()));
        }
        else {
            environmentalScoreMetrics.setModPrivilegesRequiredC(PrivilegesRequiredC.valueOf(getMPR()));
        }

        return environmentalScoreMetrics;
    }
}

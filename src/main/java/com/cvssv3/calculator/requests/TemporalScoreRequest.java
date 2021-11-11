package com.cvssv3.calculator.requests;

import com.cvssv3.calculator.enums.TemporalMetrics.ExploitCodeMaturity;
import com.cvssv3.calculator.enums.TemporalMetrics.RemediationLevel;
import com.cvssv3.calculator.enums.TemporalMetrics.ReportConfidence;
import com.cvssv3.calculator.models.TemporalScoreMetrics;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TemporalScoreRequest {

    private String E;           // Exploit Code Maturity
    private String RL;          // Remediation Level
    private String RC;          // Report Confidence

    private String baseScore;   // Temporal Score depends on Base Score

    public TemporalScoreRequest(String E, String RL, String RC, String baseScore) {
        this.E = E;
        this.RL = RL;
        this.RC = RC;
        this.baseScore = baseScore;
    }

    @Override
    public String toString() {
        return "TemporalScoreRequest{" +
                "E='" + E + '\'' +
                ", RL='" + RL + '\'' +
                ", RC='" + RC + '\'' +
                ", baseScore='" + baseScore + '\'' +
                '}';
    }

    public TemporalScoreMetrics toModel() {

        TemporalScoreMetrics temporalScoreMetrics = new TemporalScoreMetrics();

        temporalScoreMetrics.setExploitCodeMaturity(ExploitCodeMaturity.valueOf(getE()));
        temporalScoreMetrics.setRemediationLevel(RemediationLevel.valueOf(getRL()));
        temporalScoreMetrics.setReportConfidence(ReportConfidence.valueOf(getRC()));
        temporalScoreMetrics.setBaseScore(getBaseScore());

        return temporalScoreMetrics;
    }
}

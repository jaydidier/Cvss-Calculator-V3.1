package com.cvssv3.calculator.models;

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
public class TemporalScoreMetrics {

    @Enumerated(EnumType.STRING)
    private ExploitCodeMaturity exploitCodeMaturity;

    @Enumerated(EnumType.STRING)
    private RemediationLevel remediationLevel;

    @Enumerated(EnumType.STRING)
    private ReportConfidence reportConfidence;

    private String baseScore;
    private Double temporalScore;
    private String rate;

    @Override
    public String toString() {
        return "TemporalScoreMetrics{" +
                "exploitCodeMaturity=" + exploitCodeMaturity +
                ", remediationLevel=" + remediationLevel +
                ", reportConfidence=" + reportConfidence +
                ", baseScore='" + baseScore + '\'' +
                ", temporalScore=" + temporalScore +
                ", rate='" + rate + '\'' +
                '}';
    }
}

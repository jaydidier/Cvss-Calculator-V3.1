package com.cvssv3.calculator.requests;

import com.cvssv3.calculator.enums.BaseMetrics.*;
import com.cvssv3.calculator.models.BaseScoreMetrics;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BaseScoreRequest {

    private String AV;          // Attack Vector
    private String AC;          // Attack Complexity
    private String PR;          // Privileges Required
    private String UI;          // User Interaction

    private String C;           // Confidentiality Impact
    private String I;           // Integrity Impact
    private String A;           // Availability Impact

    private String S;           // Scope

    public BaseScoreRequest(String AV, String AC, String PR, String UI, String C, String I, String A, String S) {
        this.AV = AV;
        this.AC = AC;
        this.PR = PR;
        this.UI = UI;
        this.C = C;
        this.I = I;
        this.A = A;
        this.S = S;
    }

    @Override
    public String toString() {
        return "BaseScoreRequests{" +
                "AV='" + AV + '\'' +
                ", AC='" + AC + '\'' +
                ", PR='" + PR + '\'' +
                ", UI='" + UI + '\'' +
                ", C='" + C + '\'' +
                ", I='" + I + '\'' +
                ", A='" + A + '\'' +
                ", S='" + S + '\'' +
                '}';
    }

    public BaseScoreMetrics toModel() {
        BaseScoreMetrics baseScoreMetrics = new BaseScoreMetrics();

        baseScoreMetrics.setAttackVector(AttackVector.valueOf(getAV()));
        baseScoreMetrics.setAttackComplexity(AttackComplexity.valueOf(getAC()));
        baseScoreMetrics.setUserInteraction(UserInteraction.valueOf(getUI()));
        baseScoreMetrics.setScope(Scope.valueOf(getS()));
        baseScoreMetrics.setConfidentialityImpact(ImpactCIA.valueOf(getC()));
        baseScoreMetrics.setIntegrityImpact(ImpactCIA.valueOf(getI()));
        baseScoreMetrics.setAvailabilityImpact(ImpactCIA.valueOf(getA()));

        if (getS().equals("U")) { // Scope = UNCHANGED
            baseScoreMetrics.setPrivilegesRequiredU(PrivilegesRequiredU.valueOf(getPR()));
        }
        else {
            baseScoreMetrics.setPrivilegesRequiredC(PrivilegesRequiredC.valueOf(getPR()));
        }

        return baseScoreMetrics;
    }

}

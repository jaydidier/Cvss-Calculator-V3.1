package com.cvssv3.calculator.services;

import com.cvssv3.calculator.models.EnvironmentalScoreMetrics;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnvironmentalScoreService {

    @Autowired
    CvssV3Service cvssV3Service;

    public String environmentalScoreCalculation(EnvironmentalScoreMetrics environmentalScoreMetrics) throws JSONException {

        double equation = 0.0;

        if (environmentalScoreMetrics.getModScope().getDescription().equals("Unchanged")) {
            equation = 8.22 * environmentalScoreMetrics.getModAttackVector().getValue() *
                    environmentalScoreMetrics.getModAttackComplexity().getValue() *
                    environmentalScoreMetrics.getModPrivilegesRequiredU().getValue() *
                    environmentalScoreMetrics.getModUserInteraction().getValue();
        }
        else { // Scope = Changed
            equation = 8.22 * environmentalScoreMetrics.getModAttackVector().getValue() *
                    environmentalScoreMetrics.getModAttackComplexity().getValue() *
                    environmentalScoreMetrics.getModPrivilegesRequiredC().getValue() *
                    environmentalScoreMetrics.getModUserInteraction().getValue();
        }
        environmentalScoreMetrics.setModifiedExploitability(equation);


        equation = 1 - ((1 - environmentalScoreMetrics.getConfidentialityRequirement().getValue()*environmentalScoreMetrics.getModConfidentialityImpact().getValue())*
                (1 - environmentalScoreMetrics.getIntegrityRequirement().getValue()*environmentalScoreMetrics.getModIntegrityImpact().getValue())*
                (1 - environmentalScoreMetrics.getAvailabilityRequirement().getValue()*environmentalScoreMetrics.getModAvailabilityImpact().getValue()));


        double MISS = Math.min(equation,0.915);

        if (environmentalScoreMetrics.getModScope().getDescription().equals("Unchanged")) {
            equation = environmentalScoreMetrics.getModScope().getValue()*MISS;
        }
        else {
            equation = environmentalScoreMetrics.getModScope().getValue()*(MISS - 0.029) - 3.25*(Math.pow(MISS*0.9731 - 0.02,13));
        }

        environmentalScoreMetrics.setModifiedImpact(equation);

        if (environmentalScoreMetrics.getModifiedImpact() <= 0) {
            environmentalScoreMetrics.setEnvironmentalScore(0.0);
        }
        else {
            if (environmentalScoreMetrics.getModScope().getDescription().equals("U")) {
                equation = cvssV3Service.roundUp(
                        cvssV3Service.roundUp(
                                Math.min(environmentalScoreMetrics.getModifiedExploitability() + environmentalScoreMetrics.getModifiedImpact(),10))*
                                environmentalScoreMetrics.getExploitCodeMaturity().getValue()*
                                environmentalScoreMetrics.getRemediationLevel().getValue()*
                                environmentalScoreMetrics.getReportConfidence().getValue());
            }
            else {
                equation = cvssV3Service.roundUp(
                        cvssV3Service.roundUp(
                                Math.min(1.08*(environmentalScoreMetrics.getModifiedExploitability() + environmentalScoreMetrics.getModifiedImpact()),10))*
                                environmentalScoreMetrics.getExploitCodeMaturity().getValue()*
                                environmentalScoreMetrics.getRemediationLevel().getValue()*
                                environmentalScoreMetrics.getReportConfidence().getValue());
            }
            environmentalScoreMetrics.setEnvironmentalScore(equation);
        }

        environmentalScoreMetrics.setRate(cvssV3Service.putRating(environmentalScoreMetrics.getEnvironmentalScore()));

        return makeEnvironmentalJson(environmentalScoreMetrics);
    }

    public String makeEnvironmentalJson(EnvironmentalScoreMetrics environmentalScoreMetrics) throws JSONException {

        String results;
        JSONObject enviResults = new JSONObject();

        enviResults.put("environmentalScore", (environmentalScoreMetrics.getEnvironmentalScore()).toString());
        enviResults.put("modifiedImpact", (environmentalScoreMetrics.getModifiedImpact()).toString());
        enviResults.put("rate", environmentalScoreMetrics.getRate());

        results = enviResults.toString();

        return results;
    }
}

package com.cvssv3.calculator.services;

import com.cvssv3.calculator.models.BaseScoreMetrics;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BaseScoreService {

    @Autowired
    CvssV3Service cvssV3Service;

    public String BaseScoreCalculation(BaseScoreMetrics baseScoreMetrics) throws JSONException {

        double equation = 0.0;

        if (baseScoreMetrics.getScope().getDescription().equals("Unchanged")){
            equation = 8.22 * baseScoreMetrics.getAttackVector().getValue()*
                               baseScoreMetrics.getAttackComplexity().getValue()*
                               baseScoreMetrics.getPrivilegesRequiredU().getValue()*
                               baseScoreMetrics.getUserInteraction().getValue();
        }
        else { // Scope Changed
            equation = 8.22 * baseScoreMetrics.getAttackVector().getValue()*
                    baseScoreMetrics.getAttackComplexity().getValue()*
                    baseScoreMetrics.getPrivilegesRequiredC().getValue()*
                    baseScoreMetrics.getUserInteraction().getValue();
        }

        baseScoreMetrics.setExploitability(equation);


        double ISS = 1 - ((1 - baseScoreMetrics.getConfidentialityImpact().getValue())*
                         (1 - baseScoreMetrics.getIntegrityImpact().getValue())*
                         (1 - baseScoreMetrics.getAvailabilityImpact().getValue()));

        if (baseScoreMetrics.getScope().getDescription().equals("Unchanged"))  {
            equation = baseScoreMetrics.getScope().getValue()*ISS;
        }
        else {
            equation = baseScoreMetrics.getScope().getValue()*(ISS - 0.029) - 3.25*(Math.pow(ISS-0.02,15));
        }
        baseScoreMetrics.setImpact(equation);

        if (baseScoreMetrics.getImpact() <= 0) {
            baseScoreMetrics.setBaseScore(0.0);
        }
        else {
            if (baseScoreMetrics.getScope().getValue().equals("U")) {
                equation = cvssV3Service.roundUp(
                        Math.min(baseScoreMetrics.getExploitability() + baseScoreMetrics.getImpact(),
                                10));
            }
            else {
                equation = cvssV3Service.roundUp(
                        Math.min(1.08*(baseScoreMetrics.getExploitability() + baseScoreMetrics.getImpact()),
                                10));
            }
            baseScoreMetrics.setBaseScore(equation);
        }

        baseScoreMetrics.setRate(
                cvssV3Service.putRating(baseScoreMetrics.getBaseScore()));

        return makeBaseJson(baseScoreMetrics);
    }

    public String makeBaseJson(BaseScoreMetrics baseScoreMetrics) throws JSONException {

        String results;
        JSONObject baseResults = new JSONObject();

        baseResults.put("baseScore", (baseScoreMetrics.getBaseScore()).toString());
        baseResults.put("impact", (baseScoreMetrics.getImpact()).toString());
        baseResults.put("exploitability", (baseScoreMetrics.getExploitability()).toString());
        baseResults.put("rate", (baseScoreMetrics.getRate()));

        results = baseResults.toString();
        return results;
    }
}

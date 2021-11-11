package com.cvssv3.calculator.services;

import com.cvssv3.calculator.models.TemporalScoreMetrics;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TemporalScoreService {

    @Autowired
    CvssV3Service cvssV3Service;

    public String temporalScoreCalculation(TemporalScoreMetrics temporalScoreMetrics) throws JSONException {

        double baseScore = Double.parseDouble(temporalScoreMetrics.getBaseScore());
        double equation = baseScore*
                          temporalScoreMetrics.getExploitCodeMaturity().getValue()*
                          temporalScoreMetrics.getRemediationLevel().getValue()*
                          temporalScoreMetrics.getReportConfidence().getValue();

        temporalScoreMetrics.setTemporalScore(cvssV3Service.roundUp(equation));
        temporalScoreMetrics.setRate(cvssV3Service.putRating(temporalScoreMetrics.getTemporalScore()));

        return makeTemporalJson(temporalScoreMetrics);
    }

    public String makeTemporalJson(TemporalScoreMetrics temporalMetrics) throws JSONException {

        String results;

        JSONObject tempResults = new JSONObject();

        tempResults.put("temporalScore", (temporalMetrics.getTemporalScore()).toString());
        tempResults.put("rate", temporalMetrics.getRate());

        results = tempResults.toString();

        return results;

    }
}

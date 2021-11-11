package com.cvssv3.calculator.controllers;

import com.cvssv3.calculator.models.EnvironmentalScoreMetrics;
import com.cvssv3.calculator.requests.EnvironmentalScoreRequest;
import com.cvssv3.calculator.services.EnvironmentalScoreService;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api")
public class EnvironmentalCalculatorController {

    @Autowired
    EnvironmentalScoreService environmentalScoreService;

    String enviResults = "";
    @GetMapping(path="/enviScore")
    public String sendEnvironmentalMetrics(){
        return enviResults;
    }

    @PostMapping(path="/enviScore")
    public String getEnvironmentalMetrics(@RequestBody EnvironmentalScoreRequest environmentalScoreRequest) throws JSONException {

        EnvironmentalScoreMetrics environmentalScoreMetrics = environmentalScoreRequest.toModel();
        enviResults = environmentalScoreService.environmentalScoreCalculation(environmentalScoreMetrics);
        return enviResults;
    }
}
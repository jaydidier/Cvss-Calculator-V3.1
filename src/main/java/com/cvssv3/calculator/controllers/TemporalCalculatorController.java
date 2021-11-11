package com.cvssv3.calculator.controllers;

import com.cvssv3.calculator.models.TemporalScoreMetrics;
import com.cvssv3.calculator.requests.TemporalScoreRequest;
import com.cvssv3.calculator.services.TemporalScoreService;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api")
public class TemporalCalculatorController {

    @Autowired
    TemporalScoreService temporalScoreService;

    String tempResults ="";
    @GetMapping(path="/tempScore")
    public String sendTemporalMetrics(){
        return tempResults;
    }

    @PostMapping(path="/tempScore")
    public String getTemporalMetrics(@RequestBody TemporalScoreRequest temporalScoreRequest) throws JSONException {

        TemporalScoreMetrics temporalScoreMetrics = temporalScoreRequest.toModel();
        tempResults = temporalScoreService.temporalScoreCalculation(temporalScoreMetrics);
        return tempResults;
    }

}
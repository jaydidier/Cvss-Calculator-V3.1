package com.cvssv3.calculator.controllers;

import com.cvssv3.calculator.models.BaseScoreMetrics;
import com.cvssv3.calculator.requests.BaseScoreRequest;
import com.cvssv3.calculator.services.BaseScoreService;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api")
public class BaseCalculatorController {

    @Autowired
    BaseScoreService baseScoreService;

    String baseResults ="";

    @GetMapping(path="/baseScore")
    public String sendBaseMetrics(){
        return baseResults;
    }

    @PostMapping(path="/baseScore")
    public String getBaseMetrics(@RequestBody BaseScoreRequest baseScoreRequest) throws JSONException {

        BaseScoreMetrics baseScoreMetrics = baseScoreRequest.toModel();
        baseResults = baseScoreService.BaseScoreCalculation(baseScoreMetrics);
        return baseResults;
    }
}

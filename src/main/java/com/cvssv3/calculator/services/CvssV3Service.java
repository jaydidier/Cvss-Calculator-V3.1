package com.cvssv3.calculator.services;

import org.springframework.stereotype.Service;

@Service
public class CvssV3Service {

    public double roundUp(double input) {

        double int_input = Math.round(input * 100000);

        if (int_input % 10000 == 0) {
            return int_input / 100000;
        }
        else {
            return (Math.floor(int_input / 10000) + 1) / 10;
        }
    }

    public String putRating(Double baseScore) {

        String rating = "";

        if (baseScore == 0.0) {
            //System.out.print(baseScore);
            rating = "NONE";
        }
        else if ((baseScore >= 0.1) && (baseScore <= 3.9)) {
            //System.out.print(baseScore);
            rating = "LOW";
        }
        else if (baseScore <= 6.9) {
            //System.out.print(baseScore);
            rating = "MEDIUM";
        }
        else if (baseScore <= 8.9) {
            //System.out.print(baseScore);
            rating = "HIGH";
        }
        else if (baseScore <= 10.0) {
            rating = "CRITICAL";
        }

        return rating;
    }
}

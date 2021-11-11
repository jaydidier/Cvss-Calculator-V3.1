import React, {Component} from "react";

import BaseCalculator from "../../components/calculator/BaseCalculator";
import TemporalCalculator from "../../components/calculator/TemporalCalculator";
import EnvironmentalCalculator from "../../components/calculator/EnvironmentalCalculator";
import VectorString from "../../components/calculator/VectorString";
import Charts from "../../components/charts/Charts";
import './Cvss31.css';


export default class Cvss31 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            baseVector: "Select values for all base metrics to generate a vector",
            temporalVector: '',
            environmentalVector: '',

            baseScore: 'N/A',
            impact: 'N/A',
            exploitability: 'N/A',

            temporalScore: 'N/A',
            exploitCodeMaturity: '',
            remediationLevel: '',
            reportConfidence: '',

            environmentalScore: 'N/A',
            modImpact: 'N/A',

            baseMetrics: [
                {AV: ''},
                {AC: ''},
                {PR: ''},
                {UI: ''},
                {S: ''},
                {C: ''},
                {I: ''},
                {A: ''},
            ],
            showCharts: false,
            msgChartButton: "SHOW CHARTS",
            showVector: false,
            msgVectorButton: "SHOW VECTOR"
        }

    }

    dataFromBase = (vector,baseScore,impact,exploitability,baseMetrics) => {
        this.setState({
            baseVector: vector,
            baseScore: baseScore,
            impact: impact,
            exploitability: exploitability,
            baseMetrics: baseMetrics,
        })
    }

    triggerTemporal() {
        this.temporalCalculator.baseReady();
    }

    dataFromTemp = (temporalScore, exploitCodeMaturity, remediationLevel, reportConfidence,temporalVector) => {
        this.setState({
            temporalScore: temporalScore,
            exploitCodeMaturity: exploitCodeMaturity,
            remediationLevel: remediationLevel,
            reportConfidence: reportConfidence,
            temporalVector: temporalVector
        })
    }

    triggerEnvironmental() {
        this.environmentalCalculator.temporalReady();
    }

    dataFromEnv = (environmentalVector,environmentalScore,modImpact) => {
        this.setState({
            environmentalVector: environmentalVector,
            environmentalScore: environmentalScore,
            modImpact: modImpact
        })
    }

    showCharts = () => {
        if (this.state.showCharts === false) {
            this.setState({
                showCharts: true,
                msgChartButton: "HIDE CHARTS",
            })
        }
        else {
            this.setState({
                showCharts: false,
                msgChartButton: "SHOW CHARTS",
            })
        }
    }

    showVector = () => {
        if (this.state.showVector === false) {
            this.setState({
                showVector: true,
                msgVectorButton: "HIDE VECTOR",
            })
        }
        else {
            this.setState({
                showVector: false,
                msgVectorButton: "SHOW VECTOR",
            })
        }
    }

    numberFixed = (num) => {
        return Number.parseFloat(num).toFixed(1);
    }

    render() {

        return (
            <div className={"calculator"}>

                <img src="/cvss-logo.png" width="800" height="340" alt=""></img>
                <hr/>
                <h3>Common Vulnerability Scoring System Version 3.1 Calculator</h3>
                <hr/>
                <p>
                    The Common Vulnerability Scoring System (CVSS) is an open framework for communicating the characteristics and severity of software
                    vulnerabilities. CVSS consists of three metric groups: Base, Temporal, and Environmental. The Base group represents the intrinsic
                    qualities of a vulnerability that are constant over time and across user environments, the Temporal group reflects the characteristics
                    of a vulnerability that change over time, and the Environmental group represents the characteristics of a vulnerability that are
                    unique to a user's environment. The Base metrics produce a score ranging from 0 to 10, which can then be modified by scoring
                    the Temporal and Environmental metrics. A CVSS score is also represented as a vector string, a compressed textual representation
                    of the values used to derive the score.
                </p>
                <p>
                    Hover over metric group names, metric names and metric values for a summary of the information in the official
                    CVSS v3.1 Specification Document.
                </p>
                <p>
                    You can find the Specification Document for Common Vulnerability Scoring System version 3.1
                    <a href={"https://www.first.org/cvss/v3.1/specification-document"}> here</a>.
                </p>
                <hr/>
                <BaseCalculator triggerTemporal = {this.triggerTemporal.bind(this)}
                                dataFromBase = {this.dataFromBase.bind(this)}
                />
                <button className={"btn-charts"} onClick={this.showCharts.bind(this)}>{this.state.msgChartButton}</button>
                <button className={"btn-charts"} onClick={this.showVector.bind(this)}>{this.state.msgVectorButton}</button>
                { this.state.showCharts && (
                    <Charts baseData={[{name:"Base",baseScore:this.numberFixed(this.state.baseScore),impact:this.numberFixed(this.state.impact),exploitability:this.numberFixed(this.state.exploitability)}]}
                            temporalData={[{name:"Temporal",temporalScore:this.state.temporalScore}]}
                            enviData={[{name:"Environmental",environmental:this.state.environmentalScore,modImpact: this.numberFixed(this.state.modImpact)}]}
                    />
                )}
                <TemporalCalculator baseScore={this.state.baseScore}
                                    ref={temporalCalculator => this.temporalCalculator = temporalCalculator}
                                    triggerEnvironmental={this.triggerEnvironmental.bind(this)}
                                    dataFromTemp = {this.dataFromTemp.bind(this)}
                />
                <EnvironmentalCalculator exploitCodeMaturity={this.state.exploitCodeMaturity}
                                         remediationLevel={this.state.remediationLevel}
                                         reportConfidence={this.state.reportConfidence}
                                         baseMetrics={this.state.baseMetrics}
                                         ref={environmentalCalculator => this.environmentalCalculator = environmentalCalculator}
                                         dataFromEnv = {this.dataFromEnv.bind(this)}
                />
                <br/><br/>
                { this.state.showVector && (
                    <VectorString stringV={this.state.baseVector+this.state.temporalVector+this.state.environmentalVector}/>
                )}

            </div>
        )
    }
}

/*<VectorString stringV={this.state.baseVector+this.state.temporalVector+this.state.environmentalVector}/>*/
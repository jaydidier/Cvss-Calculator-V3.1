import React, {Component} from "react";
import {ToggleButtonGroup, ToggleButton, Table, Card} from "react-bootstrap";

import './Calculator.css';
import CardScore from "./CardScore";
import axios from "axios";

export default class TemporalCalculator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name:'E', value:'X'},
                {name:'RL', value:'X'},
                {name:'RC', value:'X'}
            ],
            baseScore: 'N/A',
            temporalResults: {temporalScore: 'N/A',rate: ''},
            backgroundColor: '#64ae9a',
        }
    }

    changeBackgroundColor = () => {
        const rate = this.state.temporalResults.rate;

        if (rate === "NONE") {
            this.setState({
                backgroundColor: '#093'
            })
        }
        else if (rate === "LOW") {
            this.setState({
                backgroundColor: '#ffdc36'
            })
        }
        else if (rate === "MEDIUM") {
            this.setState({
                backgroundColor: '#ffb032'
            })
        }
        else if (rate === "HIGH") {
            this.setState({
                backgroundColor: '#ff3624'
            })
        }
        else {
            this.setState({
                backgroundColor: '#ff0049'
            })
        }
    }

    sendData = () => {

        const data = this.state.data;
        const exploitCodeMaturity = data[0].value;
        const remediationLevel = data[1].value;
        const reportConfidence = data[2].value;

        let vectorString = "";
        let tempString;
        for (let i = 0; i < data.length - 1; i++) {         // -1 because of the last metric which is baseScore
            if (data[i].value !== "X") {
                tempString = "/" + data[i].name +":"+ data[i].value;
                vectorString = vectorString + tempString;
            }
        }
        this.props.dataFromTemp(this.state.temporalResults.temporalScore,exploitCodeMaturity,remediationLevel,reportConfidence,vectorString);
    }

    postData = () => {

        const data = this.state.data;

        if (this.state.baseScore !== 'N/A') {
            let temporalMetrics = {};
            let tempMetric = {};

            for (let i = 0; i < data.length; i++) {
                // making metrics object
                tempMetric = { [data[i].name]: data[i].value };
                temporalMetrics = {...temporalMetrics,...tempMetric};
            }
            tempMetric = { baseScore: this.state.baseScore}
            temporalMetrics = {...temporalMetrics,...tempMetric};

            console.log(temporalMetrics);

            axios.post("http://localhost:8080/api/tempScore", temporalMetrics)
                .then(response =>  {
                    if (response.data !== null) {
                        //alert("Data sent");
                    }
                    this.setState({
                        temporalResults: response.data,
                    })

                    this.changeBackgroundColor();
                    this.sendData();                        // sending part of Cvss String Vector and Temporal Data to CVSS31.js
                    this.props.triggerEnvironmental();      // triggering Environmental calculation
                })
        }
    }

    baseReady = () => {                                 // called right after all base metrics given

        this.setState({
            baseScore: this.props.baseScore
        }, () => {
            this.postData()
        });

    }

    changeBut = (event) => {

        const data = this.state.data;
        const index = data.findIndex((d) => d.name === event.target.name);      // find out the index of the given metric

        if ((index >= 0) && (index < data.length)) {        // for ToggleButton's double clicking

            const v = event.target.value;

            const updatedData = this.state.data.slice();    // create a copy of the array
            updatedData[index].value = v;                   // change the values

            this.setState({
                data: updatedData                           // update the array with new data
            }, () => {
                this.postData()
            });
        }

    }

    render() {
        return (
            <div className={"tempWrapper"}>
                <Card className={"card"}>
                    <Card.Header className={"card-header border"}
                                 title={"The Temporal metrics measure the current state of exploit techniques or code availability, the existence of any patches or workarounds, or the confidence " +
                                        "in the description of a vulnerability."}
                    >Temporal Score Metrics
                    </Card.Header>
                    <Card.Body>
                        <Table className="table table-bordered" >
                            <tbody>
                            <tr>
                                <th title={"This metric measures the likelihood of the vulnerability being attacked, and is typically based on the current state of exploit techniques, exploit code " +
                                           "availability, or active, “in-the-wild” exploitation. The more easily a vulnerability can be exploited, the higher the vulnerability score."}
                                >Exploit Code Maturity (E)
                                    <div>
                                        <ToggleButtonGroup onClick={this.changeBut.bind(this)} type="radio" name="E" defaultValue="X">
                                            <ToggleButton value="X" size="sm" className="btn-custom"
                                                          title={"Assigning this value indicates there is insufficient information to choose one of the other values, and has no impact on the " +
                                                                 "overall Temporal Score, i.e., it has the same effect on scoring as assigning High."}
                                            >Not Defined  <span className="badge badge-custom">E:X</span></ToggleButton>
                                            <ToggleButton value="U" size="sm" className="btn-custom"
                                                          title={"No exploit code is available, or an exploit is theoretical."}
                                            >Unproven  <span className="badge badge-custom">E:U</span></ToggleButton>
                                            <ToggleButton value="P" size="sm" className="btn-custom"
                                                          title={"Proof-of-concept exploit code is available, or an attack demonstration is not practical for most systems. The code or technique " +
                                                                 "is not functional in all situations and may require substantial modification by a skilled attacker."}
                                            >Proof-of-Concept  <span className="badge badge-custom">E:P</span></ToggleButton>
                                            <ToggleButton value="F" size="sm" className="btn-custom"
                                                          title={"Functional exploit code is available. The code works in most situations where the vulnerability exists."}
                                            >Functional  <span className="badge badge-custom">E:F</span></ToggleButton>
                                            <ToggleButton value="H" size="sm" className="btn-custom"
                                                          title={"Functional autonomous code exists, or no exploit is required (manual trigger) and details are widely available. Exploit code " +
                                                                 "works in every situation, or is actively being delivered via an autonomous agent (such as a worm or virus). Network-connected " +
                                                                 "systems are likely to encounter scanning or exploitation attempts. Exploit development has reached the level of reliable, " +
                                                                 "widely available, easy-to-use automated tools."}
                                            >High  <span className="badge badge-custom">F:H</span></ToggleButton>
                                        </ToggleButtonGroup>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th title={"The Remediation Level of a vulnerability is an important factor for prioritization. The typical vulnerability is unpatched when initially published. " +
                                           "Workarounds or hotfixes may offer interim remediation until an official patch or upgrade is issued. Each of these respective stages adjusts the " +
                                           "Temporal Score downwards, reflecting the decreasing urgency as remediation becomes final. The less official and permanent a fix, the higher the vulnerability score."}
                                >Remediation Level (RL)
                                    <div>
                                        <ToggleButtonGroup onClick={this.changeBut.bind(this)} type="radio" name="RL" defaultValue="X">
                                            <ToggleButton value="X" size="sm" className="btn-custom"
                                                          title={"Assigning this value indicates there is insufficient information to choose one of the other values, and has no impact on the " +
                                                                 "overall Temporal Score, i.e., it has the same effect on scoring as assigning Unavailable."}
                                            >Not Defined  <span className="badge badge-custom">RL:X</span></ToggleButton>
                                            <ToggleButton value="O" size="sm" className="btn-custom"
                                                          title={"A complete vendor solution is available. Either the vendor has issued an official patch, or an upgrade is available."}
                                            >Official Fix  <span className="badge badge-custom">RL:O</span></ToggleButton>
                                            <ToggleButton value="T" size="sm" className="btn-custom"
                                                          title={"There is an official but temporary fix available. This includes instances where the vendor issues a temporary hotfix, tool, or workaround."}
                                            >Temporary Fix  <span className="badge badge-custom">RL:T</span></ToggleButton>
                                            <ToggleButton value="W" size="sm" className="btn-custom"
                                                          title={"There is an unofficial, non-vendor solution available. In some cases, users of the affected technology will create a patch of their " +
                                                                 "own or provide steps to work around or otherwise mitigate the vulnerability."}
                                            >Workaround  <span className="badge badge-custom">RL:W</span></ToggleButton>
                                            <ToggleButton value="U" size="sm" className="btn-custom"
                                                          title={"\tThere is either no solution available or it is impossible to apply."}
                                            >Unavailable  <span className="badge badge-custom">RL:U</span></ToggleButton>
                                        </ToggleButtonGroup>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th title={"This metric measures the degree of confidence in the existence of the vulnerability and the credibility of the known technical details. Sometimes only the existence" +
                                           " of vulnerabilities is publicized, but without specific details. For example, an impact may be recognized as undesirable, but the root cause may not be known. " +
                                           "The vulnerability may later be corroborated by research which suggests where the vulnerability may lie, though the research may not be certain. Finally, a vulnerability " +
                                           "may be confirmed through acknowledgment by the author or vendor of the affected technology. The urgency of a vulnerability is higher when a vulnerability is known to " +
                                           "exist with certainty. This metric also suggests the level of technical knowledge available to would-be attackers. The more a vulnerability is validated by the " +
                                           "vendor or other reputable sources, the higher the score."}
                                >Report Confidence (RC)
                                    <div>
                                        <ToggleButtonGroup onClick={this.changeBut.bind(this)} type="radio" name="RC" defaultValue="X">
                                            <ToggleButton value="X" size="sm" className="btn-custom"
                                                          title={"Assigning this value indicates there is insufficient information to choose one of the other values, and has no impact on the overall " +
                                                                 "Temporal Score, i.e., it has the same effect on scoring as assigning Confirmed."}
                                            >Not Defined  <span className="badge badge-custom">RC:X</span></ToggleButton>
                                            <ToggleButton value="U" size="sm" className="btn-custom"
                                                          title={"There are reports of impacts that indicate a vulnerability is present. The reports indicate that the cause of the vulnerability is unknown, " +
                                                                 "or reports may differ on the cause or impacts of the vulnerability. Reporters are uncertain of the true nature of the vulnerability, and " +
                                                                 "there is little confidence in the validity of the reports or whether a static Base Score can be applied given the differences described. " +
                                                                 "An example is a bug report which notes that an intermittent but non-reproducible crash occurs, with evidence of memory corruption suggesting " +
                                                                 "that denial of service, or possible more serious impacts, may result."}
                                            >Unknown  <span className="badge badge-custom">RC:U</span></ToggleButton>
                                            <ToggleButton value="R" size="sm" className="btn-custom"
                                                          title={"Significant details are published, but researchers either do not have full confidence in the root cause, or do not have access to source code " +
                                                                 "to fully confirm all of the interactions that may lead to the result. Reasonable confidence exists, however, that the bug is reproducible and " +
                                                                 "at least one impact is able to be verified (proof-of-concept exploits may provide this). An example is a detailed write-up of research into a " +
                                                                 "vulnerability with an explanation (possibly obfuscated or “left as an exercise to the reader”) that gives assurances on how to reproduce the results."}
                                            >Reasonable  <span className="badge badge-custom">RC:R</span></ToggleButton>
                                            <ToggleButton value="C" size="sm" className="btn-custom"
                                                          title={"Detailed reports exist, or functional reproduction is possible (functional exploits may provide this). Source code is available to independently " +
                                                                 "verify the assertions of the research, or the author or vendor of the affected code has confirmed the presence of the vulnerability."}
                                            >Confirmed  <span className="badge badge-custom">RC:C</span></ToggleButton>
                                        </ToggleButtonGroup>
                                    </div>
                                </th>
                            </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
                <CardScore score={this.state.temporalResults.temporalScore}
                           rate={this.state.temporalResults.rate}
                           backgroundColor={this.state.backgroundColor}/>
            </div>
        )
    }
}
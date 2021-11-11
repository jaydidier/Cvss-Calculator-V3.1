import React, {Component} from "react";
import {ToggleButtonGroup, ToggleButton, Table, Card} from "react-bootstrap";

import './Calculator.css';
import CardScore from "./CardScore";
import axios from "axios";

export default class EnvironmentalCalculator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name:'MAV', value:'X', default: ''},
                {name:'MAC', value:'X', default: ''},
                {name:'MPR', value:'X', default: ''},
                {name:'MUI', value:'X', default: ''},
                {name:'MS', value:'X', default: ''},
                {name:'MC', value:'X', default: ''},
                {name:'MI', value:'X', default: ''},
                {name:'MA', value:'X', default: ''},
                {name:'CR', value:'X', default: 'X'},
                {name:'IR', value:'X', default: 'X'},
                {name:'AR', value:'X', default: 'X'}
            ],
            environmentalResults: {environmentalScore: 'N/A', modifiedImpact: '', rate: ''},
            exploitCodeMaturity: '',
            remediationLevel: '',
            reportConfidence: '',
            baseMetrics: [],

            backgroundColor: '#64ae9a'
        }
    }

    changeBackgroundColor = () => {
        const rate = this.state.environmentalResults.rate;

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

        let vectorString='';
        let tempString;
        for (let i = 0; i < data.length ; i++) {
            if (data[i].value !== "X") {
                tempString = "/" + data[i].name +":"+ data[i].value;
                vectorString = vectorString + tempString;
            }
        }
        this.props.dataFromEnv(vectorString,this.state.environmentalResults.environmentalScore,this.state.environmentalResults.modifiedImpact);
    }

    temporalReady = () => {         // called right after all base metrics are given

        this.setState({
            baseMetrics: this.props.baseMetrics
        })


        const data = this.state.data;
        const updatedData = data.slice();

        updatedData[0].default = this.props.baseMetrics.AV;
        updatedData[1].default = this.props.baseMetrics.AC;
        updatedData[2].default = this.props.baseMetrics.PR;
        updatedData[3].default = this.props.baseMetrics.UI;
        updatedData[4].default = this.props.baseMetrics.S;
        updatedData[5].default = this.props.baseMetrics.C;
        updatedData[6].default = this.props.baseMetrics.I;
        updatedData[7].default = this.props.baseMetrics.A;

        this.setState({
            exploitCodeMaturity: this.props.exploitCodeMaturity,                         // update metrics from temporal
            remediationLevel: this.props.remediationLevel,
            reportConfidence: this.props.reportConfidence,
            data: updatedData
        });


        let metrics = {};
        let temp = {};
        for (let i = 0; i <= 7; i++) {
            if (data[i].value === "X") {
                temp = { [data[i].name]: data[i].default };
            }
            else {
                temp = { [data[i].name]: data[i].value };
            }
            metrics = {...metrics,...temp};
        }

        temp = {
            [data[8].name]: data[8].value,
            [data[9].name]: data[9].value,
            [data[10].name]: data[10].value,
            exploitCodeMaturity: this.state.exploitCodeMaturity,
            remediationLevel: this.state.remediationLevel,
            reportConfidence: this.state.reportConfidence
        };
        metrics = {...metrics,...temp};

        axios.post("http://localhost:8080/api/enviScore", metrics)
            .then(response =>  {
                if (response.data !== null) {
                    //alert("Data sent");
                }
                this.setState({
                    environmentalResults: response.data,
                })
                this.sendData();
                this.changeBackgroundColor();
            })
    }

    changeBut = (event) => {

        const data = this.state.data;
        const results = this.state.environmentalResults;

        const index = data.findIndex((d) => d.name === event.target.name);      // find out the index of the given metric

        if ((index >= 0) && (index < data.length)) {        // for ToggleButton's double clicking
            const v = event.target.value;
            const updatedData = this.state.data.slice();    // create a copy of the array

            updatedData[index].value = v;                   // change the values

            this.setState({
                data: updatedData                           // update the array with new data
            });

            if (results.environmentalScore !== 'N/A') {

                let metrics = {};
                let temp = {};
                for (let i = 0; i <= 7; i++) {
                    if (updatedData[i].value === "X") {
                        temp = { [data[i].name]: data[i].default };
                    }
                    else {
                        temp = { [data[i].name]: data[i].value };
                    }
                    metrics = {...metrics,...temp};
                }

                temp = {
                    [data[8].name]: data[8].value,
                    [data[9].name]: data[9].value,
                    [data[10].name]: data[10].value,
                    exploitCodeMaturity: this.state.exploitCodeMaturity,
                    remediationLevel: this.state.remediationLevel,
                    reportConfidence: this.state.reportConfidence
                };
                metrics = {...metrics,...temp};

                axios.post("http://localhost:8080/api/enviScore", metrics)
                    .then(response =>  {
                        if (response.data !== null) {
                            //alert("Data sent");
                        }
                        this.setState({
                            environmentalResults: response.data,
                        })
                        this.changeBackgroundColor();
                        this.sendData();
                        console.log(metrics);
                    })

            }
        }
    }

    render() {
        return (
            <div className={"envWrapper"}>
                <Card className={"card"}>
                    <Card.Header className={"card-header border"}
                                 title={"These metrics enable the analyst to customize the CVSS score depending on the importance of the affected IT asset to a user’s " +
                                        "organization, measured in terms of complementary/alternative security controls in place, Confidentiality, Integrity, and " +
                                        "Availability. The metrics are the modified equivalent of Base metrics and are assigned values based on the component placement " +
                                        "within organizational infrastructure."}
                    >Environmental Score Metrics</Card.Header>
                    <Card.Body>
                        <Table className="table table-bordered" >
                            <tbody>
                            <tr>
                                <th title={"This metric reflects the context by which vulnerability exploitation is possible. " +
                                           "This metric value (and consequently the Base Score) will be larger the more remote " +
                                           "(logically, and physically) an attacker can be in order to exploit the vulnerable component. " +
                                           "The assumption is that the number of potential attackers for a vulnerability that could be exploited " +
                                           "from across a network is larger than the number of potential attackers that could exploit a vulnerability " +
                                           "requiring physical access to a device, and therefore warrants a greater Base Score."}
                                >Modified Attack Vector (MAV)
                                    <div>
                                        <ToggleButtonGroup onClick={this.changeBut.bind(this)} type="radio" name="MAV" defaultValue="X">
                                            <ToggleButton value="X" size="sm" className="btn-custom"
                                                          title={"The value assigned to the corresponding Base Metric is used."}
                                            >Not Defined  <span className="badge badge-custom">MAV:X</span></ToggleButton>
                                            <ToggleButton value="N" size="sm" className="btn-custom"
                                                          title={"The vulnerable component is bound to the network stack and the set of possible attackers extends beyond the " +
                                                                 "other options listed below, up to and including the entire Internet. Such a vulnerability is often termed " +
                                                                 "“remotely exploitable” and can be thought of as an attack being exploitable at the protocol level one or more " +
                                                                 "network hops away (e.g., across one or more routers)."}
                                            >Network  <span className="badge badge-custom">MAV:N</span></ToggleButton>
                                            <ToggleButton value="A" size="sm" className="btn-custom"
                                                          title={"The vulnerable component is bound to the network stack, but the attack is limited at the protocol level to a " +
                                                                 "logically adjacent topology. This can mean an attack must be launched from the same shared physical " +
                                                                 "(e.g., Bluetooth or IEEE 802.11) or logical (e.g., local IP subnet) network, or from within a secure or otherwise " +
                                                                 "limited administrative domain (e.g., MPLS, secure VPN to an administrative network zone). "}
                                            >Adjacent Network  <span className="badge badge-custom">MAV:A</span></ToggleButton>
                                            <ToggleButton value="L" size="sm" className="btn-custom"
                                                          title={"The vulnerable component is not bound to the network stack and the attacker’s path is via read/write/execute capabilities." +
                                                                 "Either: the attacker exploits the vulnerability by accessing the target system locally (e.g., keyboard, console), " +
                                                                 "or remotely (e.g., SSH); or the attacker relies on User Interaction by another person to perform actions required to exploit " +
                                                                 "the vulnerability (e.g., using social engineering techniques to trick a legitimate user into opening a malicious document)."}
                                            >Local  <span className="badge badge-custom">MAV:L</span></ToggleButton>
                                            <ToggleButton value="P" size="sm" className="btn-custom"
                                                          title={"The attack requires the attacker to physically touch or manipulate the vulnerable component. " +
                                                                 "Physical interaction may be brief (e.g., evil maid attack[^1]) or persistent."}
                                            >Physical  <span className="badge badge-custom">MAV:P</span></ToggleButton>
                                        </ToggleButtonGroup>
                                    </div>
                                </th>
                                <th title={"The Scope metric captures whether a vulnerability in one vulnerable component impacts resources in components beyond its security scope." +
                                           "The Base Score is greatest when a scope change occurs."}
                                >Modified Scope (MS)
                                    <div>
                                        <ToggleButtonGroup onClick={this.changeBut.bind(this)} type="radio" name="MS" defaultValue="X">
                                            <ToggleButton value="X" size="sm" className="btn-custom"
                                                          title={"The value assigned to the corresponding Base Metric is used."}
                                            >Not Defined  <span className="badge badge-custom">MS:X</span></ToggleButton>
                                            <ToggleButton value="U" size="sm" className="btn-custom"
                                                          title={"An exploited vulnerability can only affect resources managed by the same security authority. In this case, the vulnerable " +
                                                                 "component and the impacted component are either the same, or both are managed by the same security authority."}
                                            >Unchanged  <span className="badge badge-custom">MS:U</span></ToggleButton>
                                            <ToggleButton value="C" size="sm" className="btn-custom"
                                                          title={"An exploited vulnerability can affect resources beyond the security scope managed by the security authority of the vulnerable" +
                                                                 "component. In this case, the vulnerable component and the impacted component are different and managed by different security " +
                                                                 "authorities."}
                                            >Changed  <span className="badge badge-custom">MS:C</span></ToggleButton>
                                        </ToggleButtonGroup>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th title={"This metric describes the conditions beyond the attacker’s control that must exist in order to exploit the vulnerability. As described " +
                                           "below, such conditions may require the collection of more information about the target, or computational exceptions. Importantly, " +
                                           "the assessment of this metric excludes any requirements for user interaction in order to exploit the vulnerability (such conditions are " +
                                           "captured in the User Interaction metric). If a specific configuration is required for an attack to succeed, the Base metrics should be " +
                                           "scored assuming the vulnerable component is in that configuration. "}
                                >Modified Attack Complexity (MAC)
                                    <div>
                                        <ToggleButtonGroup onClick={this.changeBut.bind(this)} type="radio" name="MAC" defaultValue="X">
                                            <ToggleButton value="X" size="sm" className="btn-custom"
                                                          title={"The value assigned to the corresponding Base Metric is used."}
                                            >Not Defined  <span className="badge badge-custom">MAC:X</span></ToggleButton>
                                            <ToggleButton value="L" size="sm" className="btn-custom"
                                                          title={"Specialized access conditions or extenuating circumstances do not exist. An attacker can expect repeatable success " +
                                                                 "when attacking the vulnerable component."}
                                            >Low  <span className="badge badge-custom">MAC:L</span></ToggleButton>
                                            <ToggleButton value="H" size="sm" className="btn-custom"
                                                          title={"A successful attack depends on conditions beyond the attacker's control. That is, a successful attack cannot be accomplished " +
                                                                 "at will, but requires the attacker to invest in some measurable amount of effort in preparation or execution against the vulnerable " +
                                                                 "component before a successful attack can be expected. For example, a successful attack may depend on an attacker to: " +
                                                                 "gather knowledge about the environment in which the vulnerable target/component exists; prepare the target environment to improve " +
                                                                 "exploit reliability; or inject themselves into the logical network path between the target and the resource requested by " +
                                                                 "the victim in order to read and/or modify network communications (e.g., a man in the middle attack)."}
                                            >High  <span className="badge badge-custom">MAC:H</span></ToggleButton>
                                        </ToggleButtonGroup>
                                    </div>
                                </th>
                                <th title={"This metric measures the impact to the confidentiality of the information resources managed by a software component due to a successfully exploited " +
                                           "vulnerability. Confidentiality refers to limiting information access and disclosure to only authorized users, as well as preventing access by, " +
                                           "or disclosure to, unauthorized ones. The Base Score is greatest when the loss to the impacted component is highest."}
                                >Modified Confidentiality (MC)
                                    <div>
                                        <ToggleButtonGroup onClick={this.changeBut.bind(this)} type="radio" name="MC" defaultValue="X">
                                            <ToggleButton value="X" size="sm" className="btn-custom"
                                                          title={"The value assigned to the corresponding Base Metric is used."}
                                            >Not Defined  <span className="badge badge-custom">MC:X</span></ToggleButton>
                                            <ToggleButton value="N" size="sm" className="btn-custom"
                                                          title={"There is no loss of confidentiality within the impacted component."}
                                            >None  <span className="badge badge-custom">MC:N</span></ToggleButton>
                                            <ToggleButton value="L" size="sm" className="btn-custom"
                                                          title={"There is some loss of confidentiality. Access to some restricted information is obtained, but the attacker does not have control " +
                                                                 "over what information is obtained, or the amount or kind of loss is limited. The information disclosure does not cause a direct, " +
                                                                 "serious loss to the impacted component."}
                                            >Low  <span className="badge badge-custom">MC:L</span></ToggleButton>
                                            <ToggleButton value="H" size="sm" className="btn-custom"
                                                          title={"There is a total loss of confidentiality, resulting in all resources within the impacted component being divulged to the attacker. " +
                                                                 "Alternatively, access to only some restricted information is obtained, but the disclosed information presents a direct, serious impact. " +
                                                                 "For example, an attacker steals the administrator's password, or private encryption keys of a web server."}
                                            >High  <span className="badge badge-custom">MC:H</span></ToggleButton>
                                        </ToggleButtonGroup>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th title={"This metric describes the level of privileges an attacker must possess before successfully exploiting the vulnerability." +
                                           "The Base Score is greatest if no privileges are required."}
                                >Modified Privileges Required (MPR)
                                    <div>
                                        <ToggleButtonGroup onClick={this.changeBut.bind(this)} type="radio" name="MPR" defaultValue="X">
                                            <ToggleButton value="X" size="sm" className="btn-custom"
                                                          title={"The value assigned to the corresponding Base Metric is used."}
                                            >Not Defined  <span className="badge badge-custom">MPR:X</span></ToggleButton>
                                            <ToggleButton value="N" size="sm" className="btn-custom"
                                                          title={"The attacker is unauthorized prior to attack, and therefore does not require any access to settings or files of the the vulnerable " +
                                                                 "system to carry out an attack."}
                                            >None  <span className="badge badge-custom">MPR:N</span></ToggleButton>
                                            <ToggleButton value="L" size="sm" className="btn-custom"
                                                          title={"The attacker requires privileges that provide basic user capabilities that could normally affect only settings and files owned by a user." +
                                                                 " Alternatively, an attacker with Low privileges has the ability to access only non-sensitive resources."}
                                            >Low  <span className="badge badge-custom">MPR:L</span></ToggleButton>
                                            <ToggleButton value="H" size="sm" className="btn-custom"
                                                          title={"The attacker requires privileges that provide significant (e.g., administrative) control over the vulnerable component allowing access " +
                                                                 "to component-wide settings and files."}
                                            >High  <span className="badge badge-custom">MPR:H</span></ToggleButton>
                                        </ToggleButtonGroup>
                                    </div>
                                </th>
                                <th title={"This metric measures the impact to integrity of a successfully exploited vulnerability. Integrity refers to the trustworthiness and veracity of information. " +
                                           "The Base Score is greatest when the consequence to the impacted component is highest."}
                                >Modified Integrity (MI)
                                    <div>
                                        <ToggleButtonGroup onClick={this.changeBut.bind(this)} type="radio" name="MI" defaultValue="X">
                                            <ToggleButton value="X" size="sm" className="btn-custom"
                                                          title={"The value assigned to the corresponding Base Metric is used."}
                                            >Not Defined  <span className="badge badge-custom">MI:X</span></ToggleButton>
                                            <ToggleButton value="N" size="sm" className="btn-custom"
                                                          title={"There is no loss of integrity within the impacted component."}
                                            >None  <span className="badge badge-custom">MI:N</span></ToggleButton>
                                            <ToggleButton value="L" size="sm" className="btn-custom"
                                                          title={"Modification of data is possible, but the attacker does not have control over the consequence of a modification, or the amount of modification " +
                                                                 "is limited. The data modification does not have a direct, serious impact on the impacted component."}
                                            >Low  <span className="badge badge-custom">MI:L</span></ToggleButton>
                                            <ToggleButton value="H" size="sm" className="btn-custom"
                                                          title={"There is a total loss of integrity, or a complete loss of protection. For example, the attacker is able to modify any/all files protected by " +
                                                                 "the impacted component. Alternatively, only some files can be modified, but malicious modification would present a direct, serious consequence " +
                                                                 "to the impacted component."}
                                            >High  <span className="badge badge-custom">MI:H</span></ToggleButton>
                                        </ToggleButtonGroup>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th title={"This metric captures the requirement for a human user, other than the attacker, to participate in the successful compromise of the vulnerable component. This metric " +
                                           "determines whether the vulnerability can be exploited solely at the will of the attacker, or whether a separate user (or user-initiated process) must participate " +
                                           "in some manner. The Base Score is greatest when no user interaction is required. "}
                                >Modified User Interaction (MUI)
                                    <div>
                                        <ToggleButtonGroup onClick={this.changeBut.bind(this)} type="radio" name="MUI" defaultValue="X">
                                            <ToggleButton value="X" size="sm" className="btn-custom"
                                                          title={"The value assigned to the corresponding Base Metric is used."}
                                            >Not Defined  <span className="badge badge-custom">MUI:X</span></ToggleButton>
                                            <ToggleButton value="N" size="sm" className="btn-custom"
                                                          title={"The vulnerable system can be exploited without interaction from any user."}
                                            >None  <span className="badge badge-custom">MUI:N</span></ToggleButton>
                                            <ToggleButton value="R" size="sm" className="btn-custom"
                                                          title={"Successful exploitation of this vulnerability requires a user to take some action before the vulnerability can be exploited. For example, " +
                                                                 "a successful exploit may only be possible during the installation of an application by a system administrator."}
                                            >Required  <span className="badge badge-custom">MUI:R</span></ToggleButton>
                                        </ToggleButtonGroup>
                                    </div>
                                </th>
                                <th title={"This metric measures the impact to the availability of the impacted component resulting from a successfully exploited vulnerability. While the Confidentiality and Integrity " +
                                           "impact metrics apply to the loss of confidentiality or integrity of data (e.g., information, files) used by the impacted component, this metric refers to the loss of " +
                                           "availability of the impacted component itself, such as a networked service (e.g., web, database, email). Since availability refers to the accessibility of information " +
                                           "resources, attacks that consume network bandwidth, processor cycles, or disk space all impact the availability of an impacted component. The Base Score is greatest when " +
                                           "the consequence to the impacted component is highest."}
                                >Modified Availability (MA)
                                    <div>
                                        <ToggleButtonGroup onClick={this.changeBut.bind(this)} type="radio" name="MA" defaultValue="X">
                                            <ToggleButton value="X" size="sm" className="btn-custom"
                                                          title={"The value assigned to the corresponding Base Metric is used."}
                                            >Not Defined  <span className="badge badge-custom">MA:X</span></ToggleButton>
                                            <ToggleButton value="N" size="sm" className="btn-custom"
                                                          title={"There is no impact to availability within the impacted component."}
                                            >None  <span className="badge badge-custom">MA:N</span></ToggleButton>
                                            <ToggleButton value="L" size="sm" className="btn-custom"
                                                          title={"Performance is reduced or there are interruptions in resource availability. Even if repeated exploitation of the vulnerability is possible, the attacker " +
                                                                 "does not have the ability to completely deny service to legitimate users. The resources in the impacted component are either partially available all of the time, " +
                                                                 "or fully available only some of the time, but overall there is no direct, serious consequence to the impacted component."}
                                            >Low  <span className="badge badge-custom">MA:L</span></ToggleButton>
                                            <ToggleButton value="H" size="sm" className="btn-custom"
                                                          title={"There is a total loss of availability, resulting in the attacker being able to fully deny access to resources in the impacted component; this loss is " +
                                                                 "either sustained (while the attacker continues to deliver the attack) or persistent (the condition persists even after the attack has completed). " +
                                                                 "Alternatively, the attacker has the ability to deny some availability, but the loss of availability presents a direct, serious consequence to the impacted component " +
                                                                 "(e.g., the attacker cannot disrupt existing connections, but can prevent new connections; the attacker can repeatedly exploit a vulnerability that, in each instance " +
                                                                 "of a successful attack, leaks a only small amount of memory, but after repeated exploitation causes a service to become completely unavailable)."}
                                            >High  <span className="badge badge-custom">MA:H</span></ToggleButton>
                                        </ToggleButtonGroup>
                                    </div>
                                </th>
                            </tr>
                            <tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/><tr/>
                            <tr>
                                <th/>
                                <th title={"These metrics enable the analyst to customize the CVSS score depending on the importance of the Confidentiality of the affected IT asset to a user’s organization, relative to other impacts. " +
                                           "This metric modifies the environmental score by reweighting the Modified Confidentiality impact metric versus the other modified impacts."}
                                >Confidentiality Requirement (CR)
                                    <div>
                                        <ToggleButtonGroup onClick={this.changeBut.bind(this)} type="radio" name="CR" defaultValue="X">
                                            <ToggleButton value="X" size="sm" className="btn-custom"
                                                          title={"Assigning this value indicates there is insufficient information to choose one of the other values, and has no impact on the overall " +
                                                                 "Environmental Score, i.e., it has the same effect on scoring as assigning Medium."}
                                            >Not Defined  <span className="badge badge-custom">CR:X</span></ToggleButton>
                                            <ToggleButton value="L" size="sm" className="btn-custom"
                                                          title={"Loss of Confidentiality is likely to have only a limited adverse effect on the organization or individuals associated with the organization (e.g., employees, customers)."}
                                            >Low  <span className="badge badge-custom">CR:L</span></ToggleButton>
                                            <ToggleButton value="M" size="sm" className="btn-custom"
                                                          title={"Loss of Confidentiality is likely to have a serious adverse effect on the organization or individuals associated with the organization (e.g., employees, customers)."}
                                            >Medium  <span className="badge badge-custom">CR:M</span></ToggleButton>
                                            <ToggleButton value="H" size="sm" className="btn-custom"
                                                          title={"Loss of Confidentiality is likely to have a catastrophic adverse effect on the organization or individuals associated with the organization (e.g., employees, customers)."}
                                            >High  <span className="badge badge-custom">CR:H</span></ToggleButton>
                                        </ToggleButtonGroup>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th/>
                                <th title={"These metrics enable the analyst to customize the CVSS score depending on the importance of the Integrity of the affected IT asset to a user’s organization, relative to other impacts. " +
                                           "This metric modifies the environmental score by reweighting the Modified Integrity impact metric versus the other modified impacts."}
                                >Integrity Requirement (IR)
                                    <div>
                                        <ToggleButtonGroup onClick={this.changeBut.bind(this)} type="radio" name="IR" defaultValue="X">
                                            <ToggleButton value="X" size="sm" className="btn-custom"
                                                          title={"Assigning this value indicates there is insufficient information to choose one of the other values, and has no impact on the overall " +
                                                                 "Environmental Score, i.e., it has the same effect on scoring as assigning Medium."}
                                            >Not Defined  <span className="badge badge-custom">IR:X</span></ToggleButton>
                                            <ToggleButton value="L" size="sm" className="btn-custom"
                                                          title={"Loss of Integrity is likely to have only a limited adverse effect on the organization or individuals associated with the organization (e.g., employees, customers)."}
                                            >Low  <span className="badge badge-custom">IR:L</span></ToggleButton>
                                            <ToggleButton value="M" size="sm" className="btn-custom"
                                                          title={"Loss of Integrity is likely to have a serious adverse effect on the organization or individuals associated with the organization (e.g., employees, customers)."}
                                            >Medium  <span className="badge badge-custom">IR:M</span></ToggleButton>
                                            <ToggleButton value="H" size="sm" className="btn-custom"
                                                          title={"Loss of Integrity is likely to have a catastrophic adverse effect on the organization or individuals associated with the organization (e.g., employees, customers)."}
                                            >High  <span className="badge badge-custom">IR:H</span></ToggleButton>
                                        </ToggleButtonGroup>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th/>
                                <th title={"These metrics enable the analyst to customize the CVSS score depending on the importance of the Availability of the affected IT asset to a user’s organization, relative to other impacts. " +
                                          "This metric modifies the environmental score by reweighting the Modified Availability impact metric versus the other modified impacts."}
                                >Availability Requirement (AR)
                                    <div>
                                        <ToggleButtonGroup onClick={this.changeBut.bind(this)} type="radio" name="AR" defaultValue="X">
                                            <ToggleButton value="X" size="sm" className="btn-custom"
                                                          title={"Assigning this value indicates there is insufficient information to choose one of the other values, and has no impact on the overall " +
                                                                 "Environmental Score, i.e., it has the same effect on scoring as assigning Medium."}
                                            >Not Defined  <span className="badge badge-custom">AR:X</span></ToggleButton>
                                            <ToggleButton value="L" size="sm" className="btn-custom"
                                                          title={"Loss of Availability is likely to have only a limited adverse effect on the organization or individuals associated with the organization (e.g., employees, customers)."}
                                            >Low  <span className="badge badge-custom">AR:L</span></ToggleButton>
                                            <ToggleButton value="M" size="sm" className="btn-custom"
                                                          title={"Loss of Availability is likely to have a serious adverse effect on the organization or individuals associated with the organization (e.g., employees, customers)."}
                                            >Medium  <span className="badge badge-custom">AR:M</span></ToggleButton>
                                            <ToggleButton value="H" size="sm" className="btn-custom"
                                                          title={"Loss of Availability is likely to have a catastrophic adverse effect on the organization or individuals associated with the organization (e.g., employees, customers)."}
                                            >High  <span className="badge badge-custom">AR:H</span></ToggleButton>
                                        </ToggleButtonGroup>
                                    </div>
                                </th>
                            </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
                <CardScore score={this.state.environmentalResults.environmentalScore}
                           rate={this.state.environmentalResults.rate}
                           backgroundColor={this.state.backgroundColor}/>
            </div>
        )
    }
}
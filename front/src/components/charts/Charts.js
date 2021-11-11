import React, {Component} from "react";

import './Charts.css';
import BaseChart from "./BaseChart";
import TemporalChart from "./TemporalChart";
import EnvironmentalChart from "./EnvironmentalChart";


export default class Charts extends Component {

    render() {
        return (
            <div className={"chartContainer"}>

                    <BaseChart data={this.props.baseData}/>


                    <TemporalChart data={this.props.temporalData}/>


                    <EnvironmentalChart data={this.props.enviData}/>

            </div>
        )}
}
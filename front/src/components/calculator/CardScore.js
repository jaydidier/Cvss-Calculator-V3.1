import React, {Component} from "react";
import {Card} from "react-bootstrap";
import './CardScore.css';


export default class CardScore extends Component{

    constructor(props) {
        super(props);

        this.state = {
            showChart: false,
        }
    }

    showCharts = () => {
        if (this.state.showChart === false) {
            this.setState({
                showChart: true,
            })
        }
        else {
            this.setState({
                showChart: false,
            })
        }

        console.log(this);
    }

    render() {
        return (
            <div>
                <Card className={"scoreCard"}>
                    <Card.Body style={{backgroundColor: this.props.backgroundColor}} className={"scoreCard-body"}>
                        <div className={"score"}>{this.props.score}</div>
                        <div className={"rating"}>{this.props.rate}</div>
                    </Card.Body>
                </Card>
            </div>

        )
    }
}
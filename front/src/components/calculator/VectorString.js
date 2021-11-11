import React from "react";
import {Card, Navbar} from "react-bootstrap";
import './Calculator.css';

export default function VectorString(props) {

    return (
        <Navbar className="justify-content-center" fixed="bottom">
            <Card className="vector-card-value">
                <Card.Header className="vector-card-header-value">String Vector - {props.stringV}</Card.Header>
            </Card>
        </Navbar>

    )
}



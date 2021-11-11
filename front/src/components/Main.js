import React, {Component} from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NavigationBar from "./NavigationBar";
import Cvss31 from "../routes/cvss31/Cvss31";
import "./Main.css";


export default class Main extends Component {

    render() {
        return (
            <div className={"main-custom"}>
                <BrowserRouter>
                    <NavigationBar/>
                    <Switch>
                        <Route path="/cvss-v3.1" exact component={Cvss31}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}
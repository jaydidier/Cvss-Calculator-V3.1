import React, { PureComponent } from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';


export default class EnvironmentalChart extends PureComponent {

    render() {
        return (
            <ResponsiveContainer width="30%" aspect={3.0/2.0}>
                <BarChart data={this.props.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis type="number" domain={[0, 10]} ticks={[0,2,4,6,8,10]}/>
                    <Tooltip />
                    <Legend verticalAlign="top" align="right" layout="vertical" />
                    <Bar barSize={50} dataKey="environmental" name="Score" fill="#64ae9a" />
                    <Bar barSize={50} dataKey="modImpact" name="Modified Impact" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
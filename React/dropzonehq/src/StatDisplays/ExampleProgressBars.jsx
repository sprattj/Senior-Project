import React from 'react';
import { Progress } from 'reactstrap';
import ProgressBars from './ProgressBars.jsx';

export default class ExampleProgressBars extends React.Component {

    constructor(props) {
        super(props);      
        
        this.state = {
            bars: this.makeBars()
        };
    }

    makeBars() {
        var colors = ["danger", "info", "warning", "light", "success", "dark"];
        var values = [50, 75, 30, 25, 10, 40];
        var labels = ["Bar with label that has the value:" + values[0], "Bar with other label", "See reactstrap docs for more info",
        "Sp. Atk: " + values[3], "Sp. Def: " + values[4], "Speed:" + values[5]];
        var bars = [];
        for (var i = 0; i < colors.length; i++) {
            var nextBar = <Progress key={i} color={colors[i]} value={values[i]}>
                {labels[i]}
                </Progress>
            bars.push(nextBar);
        }
        return bars;
    }

    render() {
        return (
            <ProgressBars bars={this.state.bars} />
        );
    }
};

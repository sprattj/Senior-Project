import React from 'react';
import StatDisplay from './StatDisplay.jsx';
import { Row, Col } from 'reactstrap';

export default class RiggingStatDisplay extends React.Component {
    constructor(props) {
        super(props);
        
    } 

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <StatDisplay headerText="Rigging Stats"
                            statsToDisplay={
                                <Row>
                                    <Col>
                                        <p>Reserves Packed Today: {this.state.reservesPackedToday}</p>
                                        <p>Reserves Packed This Week: {this.state.reservesPackedWeek}</p>
                                        <p>Reserves Packed This Month: {this.state.reservesPackedMonth}</p>
                                        <p>Reserves Packed This Year: {this.state.reservesPackedYear}</p>
                                        <p>Reserves Packed Total: {this.state.reservesPackedTotal}</p>
                                    </Col>
                                    <Col>
                                        <p>Total Saves: {this.state.reserveSaves}</p>                                        
                                    </Col>
                                </Row>
                            } />
                    </Col>
                </Row>
            </div>
        );
    }
};



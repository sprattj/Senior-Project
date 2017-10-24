import React from 'react';
import PropTypes from 'prop-types';
import StatDisplay from './StatDisplay.jsx';
import { Row, Col, Card, CardHeader, CardBlock, CardFooter } from 'reactstrap';


export default class RiggingStatDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reservesPackedTotal: props.reservesPackedTotal,
            reservesPackedToday: props.reservesPackedToday,
            reservesPackedWeek: props.reservesPackedsWeek,
            reservesPackedMonth: props.reservesPackedMonth,
            reservesPackedYear: props.reservesPackedYear,
            reserveSaves: props.reserveSaves,
        }
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

RiggingStatDisplay.propTypes = {
    reservesPackedTotal: PropTypes.int,
    reservesPackedToday: PropTypes.int,
    reservesPackedWeek: PropTypes.int,
    reservesPackedMonth: PropTypes.int,
    reservesPackedYear: PropTypes.int,
    reserveSaves: PropTypes.int,
};

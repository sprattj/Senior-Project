import React from 'react';
import PropTypes from 'prop-types';
import StatDisplay from './StatDisplay.jsx';
import { Row, Col, Card, CardHeader, CardBody, CardFooter } from 'reactstrap';


export default class TandemInstructorStatDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tandemJumpsTotal: props.tandemJumpsTotal,
            tandemJumpsToday: props.tandemJumpsToday,
            tandemJumpsWeek: props.tandemJumpsWeek,
            tandemJumpsMonth: props.tandemJumpsMonth,
            tandemJumpsYear: props.tandemJumpsYear,
            tandemMalfunctionsTotal: props.tandemMalfunctionsTotal,

        }
    }

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <StatDisplay headerText="Tandem Instructor Stats"
                            statsToDisplay={
                                <Row>
                                    <Col>
                                        <p>Tandem Jumps Today: {this.state.tandemJumpsToday}</p>
                                        <p>Tandem Jumps This Week: {this.state.tandemJumpsWeek}</p>
                                        <p>Tandem Jumps This Month: {this.state.tandemJumpsMonth}</p>
                                        <p>Tandem Jumps This Year: {this.state.tandemJumpsYear}</p>
                                        <p>Career Total Tandem Jumps: {this.state.tandemJumpsTotal}</p>
                                    </Col>
                                    <Col>
                                        <p>Total Malfunctions: {this.state.tandemMalfunctionsTotal}</p>
                                    </Col>
                                </Row>
                            } />
                    </Col>
                </Row>
            </div>
        );
    }
};

TandemInstructorStatDisplay.propTypes = {
    tandemJumpsTotal:  PropTypes.int,
    tandemJumpsToday: PropTypes.int,
    tandemJumpsWeek: PropTypes.int,
    tandemJumpsMonth: PropTypes.int,
    tandemJumpsYear: PropTypes.int,
    tandemMalfunctionsTotal: PropTypes.int,
}; 
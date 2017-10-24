import React from 'react';
import PropTypes from 'prop-types';
import StatDisplay from './StatDisplay.jsx';
import { Row, Col, Card, CardHeader, CardBody, CardFooter } from 'reactstrap';


export default class AFPInstructorStatDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            AFPJumpsTotal: props.AFPJumpsTotal,
            AFPJumpsToday: props.AFPJumpsToday,
            AFPJumpsWeek: props.AFPJumpsWeek,
            AFPJumpsMonth: props.AFPJumpsMonth,
            AFPJumpsYear: props.AFPJumpsYear,
            AFPStudentMalfunctionsTotal: props.AFPStudentMalfunctionsTotal,

        }
    }

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <StatDisplay headerText="AFP Instructor Stats"
                            statsToDisplay={
                                <Row>
                                    <Col>
                                        <p>AFP Jumps Today: {this.state.AFPJumpsToday}</p>
                                        <p>AFP Jumps This Week: {this.state.AFPJumpsWeek}</p>
                                        <p>AFP Jumps This Month: {this.state.AFPJumpsMonth}</p>
                                        <p>AFP Jumps This Year: {this.state.AFPJumpsYear}</p>
                                        <p>Career Total AFP Jumps: {this.state.AFPJumpsTotal}</p>
                                    </Col>
                                    <Col>
                                        <p>Total Student Malfunctions: {this.state.AFPStudentMalfunctionsTotal}</p>
                                    </Col>
                                </Row>
                            } />
                    </Col>
                </Row>
            </div>
        );
    }
};

AFPInstructorStatDisplay.propTypes = {
    AFPJumpsTotal:  PropTypes.int,
    AFPJumpsToday: PropTypes.int,
    AFPJumpsWeek: PropTypes.int,
    AFPJumpsMonth: PropTypes.int,
    AFPJumpsYear: PropTypes.int,
    AFPStudentMalfunctionsTotal: PropTypes.int,
};
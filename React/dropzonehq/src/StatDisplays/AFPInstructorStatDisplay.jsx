import React from 'react';
import StatDisplay from './StatDisplay.jsx';
import { Row, Col } from 'reactstrap';

export default class AFPInstructorStatDisplay extends React.Component {
    constructor(props) {
        super(props);        
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
                                        <p>AFP Jumps Today: {this.props.AFPJumpsToday}</p>
                                        <p>AFP Jumps This Week: {this.props.AFPJumpsWeek}</p>
                                        <p>AFP Jumps This Month: {this.props.AFPJumpsMonth}</p>
                                        <p>AFP Jumps This Year: {this.props.AFPJumpsYear}</p>
                                    </Col>
                                </Row>
                            } />
                    </Col>
                </Row>
            </div>
        );
    }
};


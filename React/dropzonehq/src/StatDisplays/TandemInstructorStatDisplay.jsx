import React from 'react';
import StatDisplay from './StatDisplay.jsx';
import { Row, Col } from 'reactstrap';

export default class TandemInstructorStatDisplay extends React.Component {
    constructor(props) {
        super(props);        
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
                                        <p>Tandem Jumps Today: {this.props.tandemJumpsToday}</p>
                                        <p>Tandem Jumps This Week: {this.props.tandemJumpsWeek}</p>
                                        <p>Tandem Jumps This Month: {this.props.tandemJumpsMonth}</p>
                                        <p>Tandem Jumps This Year: {this.props.tandemJumpsYear}</p>
                                    </Col>
                                </Row>
                            } />
                    </Col>
                </Row>
            </div>
        );
    }
};

 
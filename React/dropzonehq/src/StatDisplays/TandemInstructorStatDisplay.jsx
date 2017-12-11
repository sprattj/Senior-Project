import React from 'react';
import StatDisplay from './StatDisplay.jsx';
import { Row, Col } from 'reactstrap';
import { rootURL } from '../restInfo.js';

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
                                        <p>Tandem Jumps This Week: {this.props.weekly_jump_count}</p>
                                        <p>Tandem Jumps This Month: {this.props.monthly_jump_count}</p>
                                        <p>Tandem Jumps This Year: {this.props.yearly_tandem_count}</p>
                                    </Col>
                                </Row>
                            } />
                    </Col>
                </Row>
            </div>
        );
    }
};

 
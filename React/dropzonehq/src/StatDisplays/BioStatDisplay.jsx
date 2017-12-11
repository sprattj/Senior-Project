import React from 'react';
import StatDisplay from './StatDisplay.jsx';
import { Row, Col } from 'reactstrap';
import { rootURL } from '../restInfo.js';


export default class BioStatDisplay extends React.Component {
    constructor(props) {
        super(props);
        
    } 

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <StatDisplay headerText="Bio"
                            statsToDisplay={
                                <Row>
                                    <Col>
                                        <p>FirstName: {this.props.firstName}</p>
                                    </Col>
                                    <Col>
                                        <p>Last Name: {this.props.lastName}</p>
                                    </Col>
                                </Row>
                            } />
                    </Col>
                </Row>
            </div>
        );
    }
}
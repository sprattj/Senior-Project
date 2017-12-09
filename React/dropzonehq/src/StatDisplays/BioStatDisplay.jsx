import React from 'react';
import StatDisplay from './StatDisplay.jsx';
import { Row, Col } from 'reactstrap';


export default class BioStatDisplay extends React.Component {
    constructor(props) {
        super(props);
        
        //Test data
        this.state = {
            visible: true,  //Bio will always be visible
            show: true,     //allow collapse and expand
            firstName: "Brian",
            lastName: "Krick",
            employmentDate: "04/2010",
            jumpCount: 7,
            bio: "Are we done yet?",
        };
        //---------
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
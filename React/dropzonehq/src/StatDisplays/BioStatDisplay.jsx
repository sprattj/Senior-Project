import React from 'react';
import StatDisplay from './StatDisplay.jsx';
import { Row, Col, Card, CardHeader, CardBody, CardFooter } from 'reactstrap';


export default class BioStatDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: props.firstName,
            lastName: props.lastName,
            employmentDate: props.employeementDate,
            jumpCount: props.jumpCount,
            bio: props.bio,
        }
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
                                        <p>FirstName: {this.state.firstName}</p>
                                        <p>Employment Date: {this.state.employmentDate}</p>
                                        <p>EditableBio: {this.state.bio}</p>
                                        
                                        
                                        <p>Reserves Packed Total: {this.state.reservePacksTotal}</p>
                                    </Col>
                                    <Col>
                                        <p>Last Name: {this.state.reserveSaves}</p>
                                        <p>Jump Count: {this.state.jumpCount}</p>
                                        <p>Change PassWord ModalButton</p>
                                    </Col>
                                </Row>
                            } />
                    </Col>
                </Row>
            </div>
        );
    }
}
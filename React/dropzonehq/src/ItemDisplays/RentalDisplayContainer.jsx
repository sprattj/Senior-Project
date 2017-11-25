import React from 'react';
import ItemDisplay from './ItemDisplay.jsx';
import { Row, Col } from 'reactstrap';

export default class RentalDisplayContainer extends React.Component {

    constructor(props) {
        super(props);        
    }

    render() {

        return (
            <div>
                <Row>
                    <Col>
                        <ItemDisplay headerText="Rental Item Details"
                            statsToDisplay={
                                <div>
                                    <Row>
                                        <Col>
                                            <p>Rental Status: {this.props.is_available ? "Available" : "Rented by " + this.props.renter_name}</p>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col>
                                            <p>Container: {this.props.brand}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <p>Description: {this.props.description}</p>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col>
                                            {this.props.button}
                                        </Col>

                                    </Row>
                                </div>
                            } />
                    </Col>
                </Row>
            </div>
        );
    }
};

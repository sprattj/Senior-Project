import React from 'react';
import ItemDisplay from './ItemDisplay.jsx';
import { Row, Col } from 'reactstrap';

export default class RentalDisplayCanopy extends React.Component {

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
                                            <p>Canopy Brand: {this.props.brand}</p>
                                        </Col>
                                        <Col>
                                            <p>Canopy Size: {this.props.size}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div>
                                                <p>Description:</p>
                                                <p>{this.props.description}</p>
                                            </div>
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
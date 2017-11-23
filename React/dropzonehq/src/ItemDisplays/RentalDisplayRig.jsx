import React from 'react';
import ItemDisplay from './ItemDisplay.jsx';
import { Row, Col } from 'reactstrap';

export default class RentalDisplayRig extends React.Component {

    constructor(props) {
        super(props);
    }

    //love that fat Inline If-Else on the rental status
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
                                            <p>Main Canopy: {this.props.main_canopy_brand} {this.props.main_canopy_size}</p>
                                            <p>Container: {this.props.container_brand}</p>
                                        </Col>
                                        <Col>
                                            <p>Reserve Canopy: {this.props.reserve_canopy_brand} {this.props.reserve_canopy_size}</p>
                                            <p>AAD Lifespan: {this.props.aad_lifespan}</p>
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